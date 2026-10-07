'use client';

import clsx from 'clsx';
import { useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { Link, useAppLocale } from '@/shared/i18n';
import {
  ArrowRightIcon,
  Badge,
  Card,
  LockIcon,
  MediaFrame,
  MediaPlaceholder,
  SkillIcon,
} from '@/shared/ui';

import type { TProject } from '../model/schema';

const VISIBLE_STACK_COUNT = 4;

/** Верх карточки: внешний радиус у карточки, у обложки — половина. */
const COVER_FRAME_CLASS =
  'rounded-b-none border-0 border-b border-[var(--border-subtle)] !rounded-t-[calc(var(--radius-card)-var(--radius-stroke))] ![--frame-radius:var(--radius-card)] ![--media-radius:calc(var(--radius-card)/2)_calc(var(--radius-card)/2)_0px_0px]';

type ProjectCardProps = {
  project: TProject;
  /** Первая карточка в сетке грузит обложку без ленивой загрузки. */
  priority?: boolean;
  stackLabels: ReadonlyMap<string, string>;
  /** Увеличенный визуальный вес (для flagship в широкой сетке). */
  featured?: boolean;
};

export const ProjectCard = ({
  project,
  priority = false,
  stackLabels,
  featured = false,
}: ProjectCardProps) => {
  const locale = useAppLocale();
  const t = useTranslations('projects');
  const prefersReducedMotion = useReducedMotion();
  const visibleStack = project.stack.slice(0, VISIBLE_STACK_COUNT);
  const hiddenStackCount = project.stack.length - visibleStack.length;
  const isFlagship = project.tier === 'flagship';

  return (
    <Card
      as='article'
      interactive
      className={clsx(
        'group flex h-full flex-col overflow-hidden',
        isFlagship &&
          'hover:border-[color-mix(in_oklab,var(--brand)_40%,var(--border-subtle))]',
        !isFlagship &&
          'hover:border-[color-mix(in_oklab,var(--border-strong)_80%,transparent)]'
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className='flex h-full flex-col'
        aria-label={`${project.name[locale]} — ${t('openCase')}`}
      >
        <div
          className={clsx(
            'overflow-hidden',
            !prefersReducedMotion &&
              'transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.02]'
          )}
        >
          {project.media.cover === null ? (
            <MediaPlaceholder
              seed={project.slug}
              label={t('mediaPlaceholder')}
              className={clsx(
                COVER_FRAME_CLASS,
                featured && 'aspect-[16/9]'
              )}
            />
          ) : (
            <MediaFrame
              asset={project.media.cover}
              locale={locale}
              priority={priority}
              autoPlay={project.media.cover.kind === 'video'}
              sizes={
                featured
                  ? '(min-width: 1024px) 66vw, (min-width: 640px) 100vw, 100vw'
                  : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              }
              className={clsx(
                COVER_FRAME_CLASS,
                featured ? 'aspect-[16/9]' : 'aspect-[16/10]'
              )}
            />
          )}
        </div>

        <div className='flex flex-1 flex-col gap-4 p-5'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge tone={isFlagship ? 'brand' : 'neutral'}>
              {t(`tier.${project.tier}`)}
            </Badge>
            <Badge tone='outline'>{t(`category.${project.category}`)}</Badge>
            {project.visibility === 'nda' ? (
              <Badge tone='support' title={t('ndaHint')}>
                <LockIcon width={12} height={12} />
                {t('ndaBadge')}
              </Badge>
            ) : null}
          </div>

          <div className='flex flex-col gap-2'>
            <h4
              className={clsx(
                'font-semibold leading-snug',
                featured ? 'text-xl' : 'text-lg'
              )}
            >
              {project.name[locale]}
            </h4>
            <p className='text-sm leading-relaxed text-[var(--text-secondary)]'>
              {project.tagline[locale]}
            </p>
          </div>

          <ul className='mt-auto flex flex-wrap gap-1.5'>
            {visibleStack.map((skillId) => (
              <li
                key={skillId}
                className='inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] bg-[var(--surface-sunken)] px-2.5 py-1 font-mono text-xs text-[var(--text-muted)]'
              >
                <SkillIcon skillId={skillId} width={12} height={12} />
                {stackLabels.get(skillId) ?? skillId}
              </li>
            ))}
            {hiddenStackCount > 0 ? (
              <li className='px-1.5 py-1 font-mono text-xs text-[var(--text-muted)]'>
                +{hiddenStackCount}
              </li>
            ) : null}
          </ul>

          <span className='inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)]'>
            {t('openCase')}
            <ArrowRightIcon
              width={14}
              height={14}
              className='transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:translate-x-1'
            />
          </span>
        </div>
      </Link>
    </Card>
  );
};
