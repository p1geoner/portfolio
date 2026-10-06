import type { TProject } from '@/entities/project';
import { breadthFirstNeighbours, buildAdjacency } from '@/shared/graph';

const RELATED_LIMIT = 3;

/**
 * Связи кейсов образуют граф: обход в ширину добирает проекты второго круга,
 * если у кейса указано меньше связей, чем нужно для блока.
 */
export const getRelatedProjects = (
  project: TProject,
  allProjects: readonly TProject[],
  limit = RELATED_LIMIT
): readonly TProject[] => {
  const adjacency = buildAdjacency(
    allProjects.map((candidate) => ({
      id: candidate.slug,
      dependsOn: candidate.related,
    }))
  );

  const bySlug = new Map(
    allProjects.map((candidate) => [candidate.slug, candidate])
  );

  return breadthFirstNeighbours(adjacency, project.slug)
    .map((slug) => bySlug.get(slug))
    .filter((candidate): candidate is TProject => candidate !== undefined)
    .slice(0, limit);
};
