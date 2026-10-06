import { useTranslations } from 'next-intl';

import type { TExperienceEntry } from '@/entities/experience';
import {
  formatDuration,
  formatPeriod,
  getPeriodMonths,
} from '@/shared/datetime';
import { Link, useAppLocale } from '@/shared/i18n';
import { Badge, BulletList, Card, Reveal } from '@/shared/ui';

type IExperienceTimelineProps = {
  entries: readonly TExperienceEntry[];
  /** Названия проектов по слагу: подписи ссылок берутся из реестра проектов. */
  projectNames: Readonly<Record<string, string>>;
};

export const ExperienceTimeline = ({
  entries,
  projectNames,
}: IExperienceTimelineProps) => {
  const locale = useAppLocale();
  const t = useTranslations('experience');
  const common = useTranslations('common');

  return (
    <ol className='relative flex flex-col gap-8'>
      <span
        aria-hidden='true'
        className='absolute top-2 bottom-2 left-[7px] w-px bg-[var(--border-subtle)] md:left-[9px]'
      />

      {entries.map((entry, index) => (
        <Reveal
          as='li'
          key={entry.id}
          delay={index * 0.06}
          variant={index % 2 === 0 ? 'left' : 'right'}
          className='relative pl-8 md:pl-12'
        >
          <span
            aria-hidden='true'
            className='absolute top-6 left-0 h-[15px] w-[15px] rounded-full border-2 border-[var(--surface-page)] bg-[var(--brand)] md:h-[19px] md:w-[19px]'
          />

          <Card className='p-6 md:p-8'>
            <div className='flex flex-col gap-2'>
              <div className='flex flex-wrap items-center gap-3'>
                <span className='font-mono text-xs text-[var(--text-muted)]'>
                  {formatPeriod(entry.period, locale, common('present'))}
                </span>
                <Badge tone='outline'>
                  {formatDuration(getPeriodMonths(entry.period), t)}
                </Badge>
              </div>

              <h3 className='text-xl'>{entry.position[locale]}</h3>
              <p className='text-sm text-[var(--text-secondary)]'>
                {entry.organization[locale]} · {entry.location[locale]}
              </p>
            </div>

            <p className='mt-4 leading-relaxed text-[var(--text-secondary)]'>
              {entry.summary[locale]}
            </p>

            {entry.grades.length > 0 ? (
              <div className='mt-6'>
                <p className='mb-3 font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                  {t('gradesTitle')}
                </p>
                <ul className='flex flex-wrap gap-2'>
                  {entry.grades.map((grade) => (
                    <li key={grade.id}>
                      <Badge tone='brand'>
                        {grade.title[locale]}
                        <span className='font-mono text-[11px] opacity-70'>
                          {formatPeriod(
                            grade.period,
                            locale,
                            common('present')
                          )}
                        </span>
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {entry.responsibilities[locale].length > 0 ? (
              <div className='mt-6'>
                <p className='mb-3 font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                  {t('responsibilitiesTitle')}
                </p>
                <BulletList items={entry.responsibilities[locale]} />
              </div>
            ) : null}

            {entry.achievements[locale].length > 0 ? (
              <div className='mt-6'>
                <p className='mb-3 font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                  {t('achievementsTitle')}
                </p>
                <BulletList items={entry.achievements[locale]} />
              </div>
            ) : null}

            {entry.projectSlugs.length > 0 ? (
              <div className='mt-6'>
                <p className='mb-3 font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                  {t('projectsTitle')}
                </p>
                <ul className='flex flex-wrap gap-2'>
                  {entry.projectSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/projects/${slug}`}
                        className='inline-flex rounded-[var(--radius-pill)] border border-[var(--border-subtle)] px-3 py-1.5 text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:border-[var(--brand)] hover:text-[var(--brand)]'
                      >
                        {projectNames[slug] ?? slug}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Card>
        </Reveal>
      ))}
    </ol>
  );
};
