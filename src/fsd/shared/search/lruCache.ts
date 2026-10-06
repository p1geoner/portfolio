/**
 * LRU-кэш на Map: порядок вставки в Map — это и есть порядок использования,
 * поэтому вытеснение самого старого элемента стоит O(1) без списка.
 * Используется для результатов поиска: при наборе запроса пользователь
 * постоянно возвращается к уже посчитанным префиксам.
 */
export class LruCache<TKey, TValue> {
  private readonly entries = new Map<TKey, TValue>();

  public constructor(private readonly capacity: number) {
    if (capacity < 1) {
      throw new Error('Размер LRU-кэша должен быть не меньше единицы');
    }
  }

  public get size(): number {
    return this.entries.size;
  }

  public get(key: TKey): TValue | undefined {
    if (!this.entries.has(key)) {
      return undefined;
    }

    const value = this.entries.get(key) as TValue;

    // Переставляем в конец: теперь это самый свежий элемент.
    this.entries.delete(key);
    this.entries.set(key, value);

    return value;
  }

  public set(key: TKey, value: TValue): void {
    if (this.entries.has(key)) {
      this.entries.delete(key);
    } else if (this.entries.size >= this.capacity) {
      const oldestKey = this.entries.keys().next().value;

      if (oldestKey !== undefined) {
        this.entries.delete(oldestKey);
      }
    }

    this.entries.set(key, value);
  }

  public clear(): void {
    this.entries.clear();
  }
}
