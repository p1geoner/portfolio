import type { TArchitecture, TArchitectureEdge } from '@/shared/content';

export type TGraphNodeLayout = {
  id: string;
  column: number;
  row: number;
};

export type TGraphLayout = {
  nodes: readonly TGraphNodeLayout[];
  columns: number;
  rowsByColumn: readonly number[];
};

/**
 * Раскладка узлов по топологическим колонкам (слева направо по направлению рёбер).
 * Несколько корней / ветвлений укладываются в строки внутри колонки.
 */
export const layoutArchitectureGraph = (
  architecture: TArchitecture
): TGraphLayout => {
  const layerIds = architecture.layers.map((layer) => layer.id);
  const idSet = new Set(layerIds);

  const outgoing = new Map<string, string[]>();
  const indegree = new Map<string, number>();

  for (const id of layerIds) {
    outgoing.set(id, []);
    indegree.set(id, 0);
  }

  for (const edge of architecture.edges) {
    if (!idSet.has(edge.from) || !idSet.has(edge.to)) continue;
    outgoing.get(edge.from)?.push(edge.to);
    indegree.set(edge.to, (indegree.get(edge.to) ?? 0) + 1);
  }

  const columnById = new Map<string, number>();
  const queue = layerIds.filter((id) => (indegree.get(id) ?? 0) === 0);

  // Если цикл или пустой граф — fallback: порядок layers.
  if (queue.length === 0) {
    const nodes = layerIds.map((id, index) => ({
      id,
      column: index,
      row: 0,
    }));
    return {
      nodes,
      columns: layerIds.length,
      rowsByColumn: layerIds.map(() => 1),
    };
  }

  for (const id of queue) {
    columnById.set(id, 0);
  }

  const queueIndex = { value: 0 };
  while (queueIndex.value < queue.length) {
    const current = queue[queueIndex.value]!;
    queueIndex.value += 1;
    const currentColumn = columnById.get(current) ?? 0;

    for (const next of outgoing.get(current) ?? []) {
      const nextColumn = Math.max(columnById.get(next) ?? 0, currentColumn + 1);
      columnById.set(next, nextColumn);

      const remaining = (indegree.get(next) ?? 1) - 1;
      indegree.set(next, remaining);
      if (remaining === 0) {
        queue.push(next);
      }
    }
  }

  // Узлы вне обхода (на случай цикла) — в конец.
  for (const id of layerIds) {
    if (!columnById.has(id)) {
      const maxCol = Math.max(0, ...columnById.values());
      columnById.set(id, maxCol + 1);
    }
  }

  const columns = Math.max(...columnById.values()) + 1;
  const rowsInColumn = Array.from({ length: columns }, () => 0);
  const nodes: TGraphNodeLayout[] = [];

  for (const id of layerIds) {
    const column = columnById.get(id) ?? 0;
    const row = rowsInColumn[column]!;
    rowsInColumn[column] = row + 1;
    nodes.push({ id, column, row });
  }

  return { nodes, columns, rowsByColumn: rowsInColumn };
};

export const edgeKey = (edge: TArchitectureEdge): string =>
  `${edge.from}->${edge.to}`;
