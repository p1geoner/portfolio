import type {
  TProject,
  TProjectCategory,
  TProjectTier,
} from '@/entities/project';
import { BitSet } from '@/shared/bitset';

export type TStackUsage = {
  readonly id: string;
  readonly count: number;
};

export type TFilterIndex = {
  readonly size: number;
  readonly slugs: readonly string[];
  readonly indexBySlug: ReadonlyMap<string, number>;
  readonly byStack: ReadonlyMap<string, BitSet>;
  readonly byTier: ReadonlyMap<TProjectTier, BitSet>;
  readonly byCategory: ReadonlyMap<TProjectCategory, BitSet>;
  /** Технологии по частоте использования: определяет порядок чипов фильтра. */
  readonly stackUsage: readonly TStackUsage[];
};

const addToBucket = <TKey>(
  buckets: Map<TKey, BitSet>,
  key: TKey,
  index: number,
  size: number
): void => {
  const bucket = buckets.get(key) ?? new BitSet(size);

  bucket.add(index);
  buckets.set(key, bucket);
};

/**
 * Предварительная сборка битовых масок: по одной маске на технологию,
 * значимость и тип. Дальше любой фильтр — это побитовое пересечение,
 * то есть 32 проекта проверяются одной операцией вместо перебора массива.
 */
export const buildFilterIndex = (
  projects: readonly TProject[]
): TFilterIndex => {
  const size = projects.length;
  const byStack = new Map<string, BitSet>();
  const byTier = new Map<TProjectTier, BitSet>();
  const byCategory = new Map<TProjectCategory, BitSet>();
  const indexBySlug = new Map<string, number>();

  projects.forEach((project, index) => {
    indexBySlug.set(project.slug, index);
    addToBucket(byTier, project.tier, index, size);
    addToBucket(byCategory, project.category, index, size);

    for (const skillId of project.stack) {
      addToBucket(byStack, skillId, index, size);
    }
  });

  const stackUsage = [...byStack.entries()]
    .map(([id, bitset]) => ({ id, count: bitset.cardinality }))
    .sort(
      (left, right) =>
        right.count - left.count || left.id.localeCompare(right.id)
    );

  return {
    size,
    slugs: projects.map((project) => project.slug),
    indexBySlug,
    byStack,
    byTier,
    byCategory,
    stackUsage,
  };
};

export type TFilterSelection = {
  readonly stackIds: readonly string[];
  readonly tiers: readonly TProjectTier[];
  readonly categories: readonly TProjectCategory[];
  /** Порядок и состав по результатам поиска; null — поиск не задан. */
  readonly searchOrder: readonly string[] | null;
};

const unionOf = <TKey>(
  buckets: ReadonlyMap<TKey, BitSet>,
  keys: readonly TKey[],
  size: number
): BitSet =>
  keys.reduce<BitSet>((accumulator, key) => {
    const bucket = buckets.get(key);

    return bucket === undefined ? accumulator : accumulator.or(bucket);
  }, new BitSet(size));

/**
 * Технологии пересекаются по И (нужны все выбранные), значимость и тип —
 * по ИЛИ внутри своей группы: так фильтр читается предсказуемо.
 */
export const applyFilters = (
  index: TFilterIndex,
  selection: TFilterSelection
): readonly string[] => {
  let result = BitSet.full(index.size);

  for (const skillId of selection.stackIds) {
    const bucket = index.byStack.get(skillId);

    if (bucket === undefined) {
      return [];
    }

    result = result.and(bucket);
  }

  if (selection.tiers.length > 0) {
    result = result.and(unionOf(index.byTier, selection.tiers, index.size));
  }

  if (selection.categories.length > 0) {
    result = result.and(
      unionOf(index.byCategory, selection.categories, index.size)
    );
  }

  if (selection.searchOrder !== null) {
    const searchBitSet = BitSet.fromIndices(
      index.size,
      selection.searchOrder
        .map((slug) => index.indexBySlug.get(slug))
        .filter((position): position is number => position !== undefined)
    );

    result = result.and(searchBitSet);

    // Порядок задаёт релевантность поиска, а не исходная сортировка.
    return selection.searchOrder.filter((slug) => {
      const position = index.indexBySlug.get(slug);

      return position !== undefined && result.has(position);
    });
  }

  return result.toArray().map((position) => index.slugs[position] as string);
};
