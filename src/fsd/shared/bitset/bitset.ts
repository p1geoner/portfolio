const BITS_PER_WORD = 32;

/**
 * Битовая маска над Uint32Array. Фильтрация по набору тегов сводится к
 * побитовому И: 32 документа проверяются одной машинной операцией, то есть
 * пересечение стоит O(n / 32) вместо вложенных перебора и includes.
 */
export class BitSet {
  private readonly words: Uint32Array;

  public constructor(public readonly size: number) {
    this.words = new Uint32Array(Math.ceil(size / BITS_PER_WORD));
  }

  public static full(size: number): BitSet {
    const bitset = new BitSet(size);

    for (let index = 0; index < size; index += 1) {
      bitset.add(index);
    }

    return bitset;
  }

  public static fromIndices(size: number, indices: Iterable<number>): BitSet {
    const bitset = new BitSet(size);

    for (const index of indices) {
      bitset.add(index);
    }

    return bitset;
  }

  public add(index: number): void {
    if (index < 0 || index >= this.size) {
      return;
    }

    const word = index >>> 5;
    const current = this.words[word] as number;

    this.words[word] = current | (1 << (index & 31));
  }

  public has(index: number): boolean {
    if (index < 0 || index >= this.size) {
      return false;
    }

    const word = this.words[index >>> 5] as number;

    return (word & (1 << (index & 31))) !== 0;
  }

  public and(other: BitSet): BitSet {
    const result = new BitSet(Math.min(this.size, other.size));

    for (let word = 0; word < result.words.length; word += 1) {
      result.words[word] =
        (this.words[word] as number) & (other.words[word] as number);
    }

    return result;
  }

  public or(other: BitSet): BitSet {
    const result = new BitSet(Math.max(this.size, other.size));

    for (let word = 0; word < result.words.length; word += 1) {
      result.words[word] =
        (this.words[word] as number) | 0 | ((other.words[word] as number) | 0);
    }

    return result;
  }

  /** Число установленных бит: алгоритм Хэмминга без цикла по битам. */
  public get cardinality(): number {
    let total = 0;

    for (const word of this.words) {
      let value = word - ((word >>> 1) & 0x55555555);

      value = (value & 0x33333333) + ((value >>> 2) & 0x33333333);
      value = (value + (value >>> 4)) & 0x0f0f0f0f;
      total += (value * 0x01010101) >>> 24;
    }

    return total;
  }

  public isEmpty(): boolean {
    return this.words.every((word) => word === 0);
  }

  public *[Symbol.iterator](): Generator<number> {
    for (let word = 0; word < this.words.length; word += 1) {
      let value = this.words[word] as number;

      while (value !== 0) {
        // Младший установленный бит: изолируем, определяем позицию, гасим.
        const lowest = value & -value;
        const bit = 31 - Math.clz32(lowest);

        yield word * BITS_PER_WORD + bit;
        value &= value - 1;
      }
    }
  }

  public toArray(): number[] {
    return [...this];
  }
}
