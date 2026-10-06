import { projectsConfig } from '@content/config/projects';

import { parseConfig } from '@/shared/content';

import { type TProject, type TProjectTier, projectsSchema } from './schema';

/**
 * Конфиг разбирается один раз на модуль. Дальше работаем только с
 * валидированными данными и заранее построенными индексами.
 */
const projects: readonly TProject[] = parseConfig(
  projectsSchema,
  projectsConfig,
  'content/config/projects'
)
  .slice()
  .sort((left, right) => left.order - right.order);

/** Поиск по slug за O(1) вместо перебора массива на каждой странице. */
const projectsBySlug = new Map(
  projects.map((project) => [project.slug, project])
);

const TIER_WEIGHT: Record<TProjectTier, number> = {
  flagship: 0,
  major: 1,
  support: 2,
  pet: 3,
};

export const getProjects = (): readonly TProject[] => projects;

export const getProjectBySlug = (slug: string): TProject | null =>
  projectsBySlug.get(slug) ?? null;

export const getProjectSlugs = (): readonly string[] =>
  projects.map((project) => project.slug);

export const getFlagshipProjects = (limit?: number): readonly TProject[] => {
  const flagships = projects.filter((project) => project.tier === 'flagship');

  return typeof limit === 'number' ? flagships.slice(0, limit) : flagships;
};

export const compareByTier = (left: TProject, right: TProject): number =>
  TIER_WEIGHT[left.tier] - TIER_WEIGHT[right.tier] || left.order - right.order;

/** Сколько проектов использует каждую технологию: считается один раз. */
const stackUsage: Readonly<Record<string, number>> = projects.reduce<
  Record<string, number>
>((usage, project) => {
  for (const skillId of project.stack) {
    usage[skillId] = (usage[skillId] ?? 0) + 1;
  }

  return usage;
}, {});

export const getStackUsage = (): Readonly<Record<string, number>> => stackUsage;

const namesBySlug = (locale: 'ru' | 'en'): Readonly<Record<string, string>> =>
  Object.fromEntries(
    projects.map((project) => [project.slug, project.name[locale]])
  );

export const getProjectNames = (
  locale: 'ru' | 'en'
): Readonly<Record<string, string>> => namesBySlug(locale);
