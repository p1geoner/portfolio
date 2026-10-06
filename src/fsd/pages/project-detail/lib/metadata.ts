import type { Metadata } from 'next';

import { getProjectBySlug } from '@/entities/project';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildProjectMetadata = (
  locale: TLocale,
  slug: string
): Metadata => {
  const project = getProjectBySlug(slug);
  const site = getSiteConfig();

  if (project === null) {
    return buildPageMetadata({
      locale,
      path: `/projects/${slug}`,
      title: site.title[locale],
      description: site.description[locale],
      noIndex: true,
    });
  }

  return buildPageMetadata({
    locale,
    path: `/projects/${project.slug}`,
    title: `${project.name[locale]} — ${project.tagline[locale]}`,
    description: project.summary[locale],
    keywords: project.keywords[locale],
    type: 'article',
  });
};
