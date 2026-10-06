import { experienceConfig } from '@content/config/experience.config';

import { parseConfig } from '@/shared/content';

import { type TExperienceEntry, experienceSchema } from './schema';

const toTimestamp = (yearMonth: string): number =>
  Number.parseInt(yearMonth.replace('-', ''), 10);

/** Сначала самое свежее: сортируем по дате начала по убыванию. */
const entries: readonly TExperienceEntry[] = parseConfig(
  experienceSchema,
  experienceConfig,
  'content/config/experience.config'
)
  .slice()
  .sort(
    (left, right) =>
      toTimestamp(right.period.from) - toTimestamp(left.period.from)
  );

export const getExperience = (): readonly TExperienceEntry[] => entries;

export const getWorkExperience = (): readonly TExperienceEntry[] =>
  entries.filter((entry) => entry.kind === 'work');

export const getEducation = (): readonly TExperienceEntry[] =>
  entries.filter((entry) => entry.kind === 'education');
