'use client';

import { useTranslations } from 'next-intl';
import { useMemo, useState, type ReactNode } from 'react';

import {
  PROJECT_TIERS,
  type TProject,
  type TProjectTier,
} from '@/entities/project';
import {
  FilterChip,
  applyFilters,
  buildFilterIndex,
  buildSearchDocuments,
} from '@/features/project-explorer';
import { useDebouncedValue } from '@/shared/lib';
import { useAppLocale } from '@/shared/i18n';
import { SearchIndex } from '@/shared/search';
import { Button, CloseIcon, SearchIcon } from '@/shared/ui';
import { FlagshipShowcase } from '@/widgets/flagship-showcase';

type ProjectsCatalogProps = {
  projects: readonly TProject[];
  stackLabels: Readonly<Record<string, string>>;
  stackLabelsByProject: Readonly<
    Record<string, Readonly<Record<string, string>>>
  >;
  architecturePreviews: Readonly<Record<string, ReactNode>>;
};

const toggleValue = <TValue,>(
  values: readonly TValue[],
  value: TValue
): TValue[] =>
  values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];

export const ProjectsCatalog = ({
  projects,
  stackLabels,
  stackLabelsByProject,
  architecturePreviews,
}: ProjectsCatalogProps) => {
  const locale = useAppLocale();
  const t = useTranslations('projects');

  const [query, setQuery] = useState('');
  const [tiers, setTiers] = useState<readonly TProjectTier[]>([]);
  const debouncedQuery = useDebouncedValue(query);

  const filterIndex = useMemo(() => buildFilterIndex(projects), [projects]);
  const searchIndex = useMemo(
    () => new SearchIndex(buildSearchDocuments(projects, locale, stackLabels)),
    [projects, locale, stackLabels]
  );
  const searchResult = useMemo(
    () => searchIndex.search(debouncedQuery),
    [searchIndex, debouncedQuery]
  );
  const projectsBySlug = useMemo(
    () => new Map(projects.map((project) => [project.slug, project])),
    [projects]
  );

  const visibleProjects = useMemo(() => {
    const slugs = applyFilters(filterIndex, {
      stackIds: [],
      tiers,
      categories: [],
      searchOrder: debouncedQuery.trim() === '' ? null : searchResult.ids,
    });

    return slugs
      .map((slug) => projectsBySlug.get(slug))
      .filter((project): project is TProject => project !== undefined);
  }, [filterIndex, tiers, debouncedQuery, searchResult.ids, projectsBySlug]);

  const hasActiveFilters = query !== '' || tiers.length > 0;

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-5'>
        <div className='relative'>
          <SearchIcon
            className='pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--text-muted)]'
            width={18}
            height={18}
          />
          <input
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchLabel')}
            aria-describedby='project-search-hint'
            className='h-12 w-full rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] pr-4 pl-11 text-base text-[var(--text-primary)] transition-colors duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--brand)]'
          />
        </div>
        <p
          id='project-search-hint'
          className='text-sm text-[var(--text-muted)]'
        >
          {t('searchHint')}
        </p>

        <div className='flex flex-col gap-3'>
          <p className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
            {t('filterByTier')}
          </p>
          <div className='flex flex-wrap gap-2'>
            {PROJECT_TIERS.map((tier) => (
              <FilterChip
                key={tier}
                label={t(`tier.${tier}`)}
                active={tiers.includes(tier)}
                onToggle={() =>
                  setTiers((current) => toggleValue(current, tier))
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-5'>
        <p aria-live='polite' className='text-sm text-[var(--text-secondary)]'>
          {t('resultsCount', { count: visibleProjects.length })}
        </p>
        {hasActiveFilters ? (
          <Button
            variant='ghost'
            size='sm'
            onClick={() => {
              setQuery('');
              setTiers([]);
            }}
          >
            <CloseIcon width={14} height={14} />
            {t('resetFilters')}
          </Button>
        ) : null}
      </div>

      {visibleProjects.length === 0 ? (
        <div className='rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] p-10 text-center'>
          <p className='text-lg font-medium'>{t('emptyTitle')}</p>
          <p className='mt-2 text-sm text-[var(--text-secondary)]'>
            {t('emptyText')}
          </p>
          {searchResult.suggestions.length > 0 ? (
            <p className='mt-4 text-sm text-[var(--text-muted)]'>
              {t('suggestions')}:{' '}
              {searchResult.suggestions.map((suggestion, index) => (
                <span key={suggestion}>
                  {index > 0 ? ', ' : ''}
                  <button
                    type='button'
                    className='text-[var(--brand)] underline underline-offset-2'
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </button>
                </span>
              ))}
            </p>
          ) : null}
        </div>
      ) : (
        <FlagshipShowcase
          projects={visibleProjects}
          stackLabelsByProject={stackLabelsByProject}
          architecturePreviews={architecturePreviews}
        />
      )}
    </div>
  );
};
