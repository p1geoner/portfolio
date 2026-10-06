import { boundedEditDistance } from './editDistance';
import { LruCache } from './lruCache';
import { tokenize } from './tokenize';
import { Trie } from './trie';

/** Вес поля влияет на порядок выдачи: совпадение в названии важнее, чем в тексте. */
export type TSearchField = {
  readonly text: string;
  readonly weight: number;
};

export type TSearchDocument = {
  readonly id: string;
  readonly fields: readonly TSearchField[];
};

export type TSearchResult = {
  readonly ids: readonly string[];
  /** Подсказки при опечатке: показываются, когда точных совпадений нет. */
  readonly suggestions: readonly string[];
};

type Posting = Map<string, number>;

const SUGGESTION_MAX_DISTANCE = 2;
const SUGGESTION_LIMIT = 3;
const CACHE_CAPACITY = 64;

/**
 * Инвертированный индекс: термин → документы, в которых он встречается,
 * вместе с накопленным весом. Поиск термина стоит O(1) по хеш-таблице,
 * тогда как наивный перебор документов — O(n) на каждый запрос.
 */
export class SearchIndex {
  private readonly postings = new Map<string, Posting>();

  private readonly vocabulary: Trie;

  private readonly allIds: readonly string[];

  private readonly cache = new LruCache<string, TSearchResult>(CACHE_CAPACITY);

  public constructor(documents: readonly TSearchDocument[]) {
    const terms = new Set<string>();

    for (const document of documents) {
      for (const field of document.fields) {
        for (const token of tokenize(field.text)) {
          terms.add(token);

          const posting = this.postings.get(token) ?? new Map<string, number>();
          const score = posting.get(document.id) ?? 0;

          posting.set(document.id, score + field.weight);
          this.postings.set(token, posting);
        }
      }
    }

    this.vocabulary = new Trie(terms);
    this.allIds = documents.map((document) => document.id);
  }

  public get termCount(): number {
    return this.postings.size;
  }

  /**
   * Пустой запрос возвращает все документы: фильтрация по стеку и типу
   * работает отдельно, поиск не должен «съедать» выдачу.
   */
  public search(query: string): TSearchResult {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length === 0) {
      return { ids: this.allIds, suggestions: [] };
    }

    const cached = this.cache.get(normalizedQuery);

    if (cached !== undefined) {
      return cached;
    }

    const result = this.execute(normalizedQuery);

    this.cache.set(normalizedQuery, result);

    return result;
  }

  private execute(query: string): TSearchResult {
    const tokens = tokenize(query);

    if (tokens.length === 0) {
      return { ids: this.allIds, suggestions: [] };
    }

    const perTokenScores = tokens.map((token, index) =>
      // Последний токен пользователь ещё набирает — ищем его как префикс.
      this.collectScores(token, index === tokens.length - 1)
    );

    if (perTokenScores.some((scores) => scores.size === 0)) {
      return { ids: [], suggestions: this.suggest(tokens) };
    }

    // Пересечение начинаем с самого редкого термина: так на каждом шаге
    // обходим минимально возможное число документов.
    const ordered = perTokenScores
      .slice()
      .sort((left, right) => left.size - right.size);

    const [smallest, ...rest] = ordered;

    if (smallest === undefined) {
      return { ids: [], suggestions: [] };
    }

    const totals = new Map<string, number>();

    outer: for (const [id, score] of smallest) {
      let total = score;

      for (const scores of rest) {
        const next = scores.get(id);

        if (next === undefined) {
          continue outer;
        }

        total += next;
      }

      totals.set(id, total);
    }

    const ids = [...totals.entries()]
      .sort(([leftId, leftScore], [rightId, rightScore]) =>
        rightScore === leftScore
          ? leftId.localeCompare(rightId)
          : rightScore - leftScore
      )
      .map(([id]) => id);

    return {
      ids,
      suggestions: ids.length === 0 ? this.suggest(tokens) : [],
    };
  }

  private collectScores(
    token: string,
    allowPrefix: boolean
  ): Map<string, number> {
    const scores = new Map<string, number>();
    const exact = this.postings.get(token);

    if (exact !== undefined) {
      for (const [id, score] of exact) {
        scores.set(id, score);
      }
    }

    if (!allowPrefix) {
      return scores;
    }

    for (const term of this.vocabulary.withPrefix(token)) {
      const posting = this.postings.get(term);

      if (posting === undefined || term === token) {
        continue;
      }

      for (const [id, score] of posting) {
        // Префиксное совпадение слабее точного, поэтому вклад уменьшен.
        scores.set(id, (scores.get(id) ?? 0) + score * 0.5);
      }
    }

    return scores;
  }

  private suggest(tokens: readonly string[]): readonly string[] {
    const target = tokens.at(-1);

    if (target === undefined || target.length < 3) {
      return [];
    }

    const candidates: Array<{ term: string; distance: number }> = [];

    for (const term of this.postings.keys()) {
      const distance = boundedEditDistance(
        target,
        term,
        SUGGESTION_MAX_DISTANCE
      );

      if (distance <= SUGGESTION_MAX_DISTANCE) {
        candidates.push({ term, distance });
      }
    }

    return candidates
      .sort(
        (left, right) =>
          left.distance - right.distance || left.term.localeCompare(right.term)
      )
      .slice(0, SUGGESTION_LIMIT)
      .map((candidate) => candidate.term);
  }
}
