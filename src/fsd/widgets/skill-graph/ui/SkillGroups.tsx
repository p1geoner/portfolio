'use client';

import { useTranslations } from 'next-intl';

import { SKILL_GROUPS, type TSkill } from '@/entities/skill';
import { useAppLocale } from '@/shared/i18n';
import { Reveal } from '@/shared/ui';

type ISkillGroupsProps = {
  skills: readonly TSkill[];
};

export const SkillGroups = ({ skills }: ISkillGroupsProps) => {
  const locale = useAppLocale();
  const t = useTranslations('stack');

  return (
    <div className='flex flex-col gap-8'>
      {SKILL_GROUPS.map((group, index) => {
        const groupSkills = skills.filter((skill) => skill.group === group);

        if (groupSkills.length === 0) {
          return null;
        }

        return (
          <Reveal
            key={group}
            delay={index * 0.08}
            variant='up'
            className='flex flex-col gap-4 border-t border-[var(--border-subtle)] pt-6'
          >
            <h2 className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
              {t(`group.${group}`)}
            </h2>

            <ul className='flex flex-wrap gap-2'>
              {groupSkills.map((skill) => (
                <li key={skill.id}>
                  <span
                    title={t(`level.${skill.level}`)}
                    className='inline-flex rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] px-3 py-1.5 text-sm text-[var(--text-primary)] transition-colors duration-500 hover:border-[var(--border-strong)] hover:bg-[var(--surface-sunken)]'
                  >
                    {skill.name}
                  </span>
                </li>
              ))}
            </ul>

            <ul className='flex flex-col gap-2'>
              {groupSkills
                .filter((skill) => skill.note !== undefined)
                .map((skill) => (
                  <li
                    key={`${skill.id}-note`}
                    className='text-xs leading-relaxed text-[var(--text-muted)]'
                  >
                    <span className='font-medium text-[var(--text-secondary)]'>
                      {skill.name}:
                    </span>{' '}
                    {skill.note?.[locale]}
                  </li>
                ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
};
