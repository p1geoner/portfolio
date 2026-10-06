import type { TAdjacency } from './adjacency';

/**
 * Обход в ширину от узла: возвращает соседей по возрастанию расстояния.
 * Для блока «связанные проекты» это ровно нужный порядок — сначала прямые
 * связи, потом связи связей.
 */
export const breadthFirstNeighbours = (
  adjacency: TAdjacency,
  startId: string,
  maxDepth = 2
): readonly string[] => {
  if (!adjacency.has(startId)) {
    return [];
  }

  const visited = new Set<string>([startId]);
  const ordered: string[] = [];
  let frontier: string[] = [startId];
  let depth = 0;

  while (frontier.length > 0 && depth < maxDepth) {
    const nextFrontier: string[] = [];

    for (const id of frontier) {
      for (const neighbourId of adjacency.get(id) ?? []) {
        if (visited.has(neighbourId)) {
          continue;
        }

        visited.add(neighbourId);
        ordered.push(neighbourId);
        nextFrontier.push(neighbourId);
      }
    }

    frontier = nextFrontier;
    depth += 1;
  }

  return ordered;
};
