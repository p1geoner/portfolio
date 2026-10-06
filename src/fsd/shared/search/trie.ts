type TrieNode = {
  children: Map<string, TrieNode>;
  /** Термины, заканчивающиеся в этом узле: узел может быть и префиксом. */
  terminal: boolean;
};

const createNode = (): TrieNode => ({
  children: new Map(),
  terminal: false,
});

/**
 * Префиксное дерево для автодополнения. Поиск по префиксу стоит O(p + k),
 * где p — длина префикса, k — число найденных терминов, вместо O(n) перебора
 * всего словаря на каждое нажатие клавиши.
 */
export class Trie {
  private readonly root: TrieNode = createNode();

  private size = 0;

  public constructor(terms: Iterable<string> = []) {
    for (const term of terms) {
      this.insert(term);
    }
  }

  public get termCount(): number {
    return this.size;
  }

  public insert(term: string): void {
    if (term.length === 0) {
      return;
    }

    let node = this.root;

    for (const char of term) {
      const next = node.children.get(char) ?? createNode();

      node.children.set(char, next);
      node = next;
    }

    if (!node.terminal) {
      node.terminal = true;
      this.size += 1;
    }
  }

  public has(term: string): boolean {
    const node = this.findNode(term);

    return node !== null && node.terminal;
  }

  /** Все термины с указанным префиксом, не больше limit. */
  public withPrefix(prefix: string, limit = 24): string[] {
    const start = this.findNode(prefix);

    if (start === null) {
      return [];
    }

    const found: string[] = [];
    const stack: Array<{ node: TrieNode; word: string }> = [
      { node: start, word: prefix },
    ];

    while (stack.length > 0 && found.length < limit) {
      const current = stack.pop();

      if (current === undefined) {
        break;
      }

      if (current.node.terminal) {
        found.push(current.word);
      }

      for (const [char, child] of current.node.children) {
        stack.push({ node: child, word: current.word + char });
      }
    }

    return found;
  }

  private findNode(prefix: string): TrieNode | null {
    let node = this.root;

    for (const char of prefix) {
      const next = node.children.get(char);

      if (next === undefined) {
        return null;
      }

      node = next;
    }

    return node;
  }
}
