export type TGraphNode = {
  readonly id: string;
  readonly dependsOn: readonly string[];
};

export type TAdjacency = ReadonlyMap<string, ReadonlySet<string>>;

/**
 * Список смежности вместо матрицы: граф стека разряжённый, поэтому память
 * тратится на реальные связи, а обход соседей стоит O(deg(v)).
 */
export const buildAdjacency = (nodes: readonly TGraphNode[]): TAdjacency => {
  const adjacency = new Map<string, Set<string>>();

  for (const node of nodes) {
    if (!adjacency.has(node.id)) {
      adjacency.set(node.id, new Set());
    }
  }

  for (const node of nodes) {
    for (const dependencyId of node.dependsOn) {
      adjacency.get(node.id)?.add(dependencyId);
      // Обратное ребро тоже нужно: связи в интерфейсе двунаправленные.
      adjacency.get(dependencyId)?.add(node.id);
    }
  }

  return adjacency;
};

export const buildDirectedEdges = (
  nodes: readonly TGraphNode[]
): ReadonlyMap<string, ReadonlySet<string>> => {
  const edges = new Map<string, Set<string>>();

  for (const node of nodes) {
    edges.set(node.id, new Set(node.dependsOn));
  }

  return edges;
};
