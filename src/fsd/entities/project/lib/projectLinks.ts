import type { TProject, TProjectLinks } from '../model/schema';

/**
 * Единственный способ получить ссылки проекта. У кейсов под NDA ссылок
 * не существует на уровне типа, поэтому проверка визибилити тут — не
 * защитное программирование, а сужение union-типа.
 */
export const getProjectLinks = (project: TProject): TProjectLinks | null =>
  project.visibility === 'public' ? project.links : null;

export const hasProjectLinks = (project: TProject): boolean => {
  const links = getProjectLinks(project);

  return links !== null && Object.values(links).some(Boolean);
};

export const isUnderNda = (project: TProject): boolean =>
  project.visibility === 'nda';
