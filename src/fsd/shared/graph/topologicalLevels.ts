import type { TGraphNode } from './adjacency';

export type TTopologicalLevels = {
  /** Уровни от независимых узлов к зависимым. */
  readonly levels: readonly (readonly string[])[];
  /** Узлы, попавшие в цикл: в корректном конфиге список пуст. */
  readonly cyclic: readonly string[];
};

/**
 * Алгоритм Кана с разбиением на уровни: узел попадает на уровень на единицу
 * глубже самой глубокой своей зависимости. Сложность O(V + E).
 * Цикл обнаруживается тем, что часть узлов так и не получает нулевую степень.
 */
export const topologicalLevels = (
  nodes: readonly TGraphNode[]
): TTopologicalLevels => {
  const knownIds = new Set(nodes.map((node) => node.id));
  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();

  for (const node of nodes) {
    const dependencies = node.dependsOn.filter((id) => knownIds.has(id));

    inDegree.set(node.id, dependencies.length);

    for (const dependencyId of dependencies) {
      const bucket = dependents.get(dependencyId) ?? [];

      bucket.push(node.id);
      dependents.set(dependencyId, bucket);
    }
  }

  const levels: string[][] = [];
  let frontier = [...inDegree.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([id]) => id)
    .sort((left, right) => left.localeCompare(right));

  let processed = 0;

  while (frontier.length > 0) {
    levels.push(frontier);
    processed += frontier.length;

    const nextFrontier: string[] = [];

    for (const id of frontier) {
      for (const dependentId of dependents.get(id) ?? []) {
        const remaining = (inDegree.get(dependentId) ?? 0) - 1;

        inDegree.set(dependentId, remaining);

        if (remaining === 0) {
          nextFrontier.push(dependentId);
        }
      }
    }

    frontier = nextFrontier.sort((left, right) => left.localeCompare(right));
  }

  const cyclic =
    processed === nodes.length
      ? []
      : nodes
          .map((node) => node.id)
          .filter((id) => (inDegree.get(id) ?? 0) > 0);

  return { levels, cyclic };
};
