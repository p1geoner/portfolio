import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getProjects } from '@/entities/project';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildProjectsMetadata = async (
  locale: TLocale
): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'projects' });
  const site = getSiteConfig();
  const projects = getProjects();

  return buildPageMetadata({
    locale,
    path: '/projects',
    title: `${t('title')} — ${site.name[locale]}`,
    description: `${t('subtitle')}. ${t('resultsCount', {
      count: projects.length,
    })}.`,
    keywords: projects
      .flatMap((project) => project.keywords[locale])
      .slice(0, 24),
  });
};
