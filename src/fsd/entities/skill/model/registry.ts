import { skillsConfig } from '@content/config/skills.config';

import { parseConfig } from '@/shared/content';

import { type TSkill, type TSkillGroup, skillsSchema } from './schema';

const skills: readonly TSkill[] = parseConfig(
  skillsSchema,
  skillsConfig,
  'content/config/skills.config'
);

const skillsById = new Map(skills.map((skill) => [skill.id, skill]));

export const getSkills = (): readonly TSkill[] => skills;

export const getSkillById = (id: string): TSkill | null =>
  skillsById.get(id) ?? null;

/** Навыки конкретного проекта в порядке, заданном в его конфиге. */
export const getSkillsByIds = (ids: readonly string[]): readonly TSkill[] =>
  ids
    .map((id) => skillsById.get(id))
    .filter((skill): skill is TSkill => skill !== undefined);

/** Подписи навыков для чипов и фильтров: строится один раз на модуль. */
const skillLabels: Readonly<Record<string, string>> = Object.fromEntries(
  skills.map((skill) => [skill.id, skill.name])
);

export const getSkillLabels = (): Readonly<Record<string, string>> =>
  skillLabels;

export const groupSkills = (): ReadonlyMap<TSkillGroup, readonly TSkill[]> => {
  const grouped = new Map<TSkillGroup, TSkill[]>();

  for (const skill of skills) {
    const bucket = grouped.get(skill.group);

    if (bucket) {
      bucket.push(skill);
    } else {
      grouped.set(skill.group, [skill]);
    }
  }

  return grouped;
};
