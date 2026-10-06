import type { MetadataRoute } from 'next';

import { getProjects } from '@/entities/project';
import { getNavigation } from '@/shared/config';
import { DEFAULT_LOCALE, LOCALES, getHtmlLang } from '@/shared/content';
import { buildAbsoluteUrl } from '@/shared/seo';

type SitemapRoute = {
  readonly path: string;
  readonly priority: number;
  readonly changeFrequency: 'monthly' | 'yearly';
};

/**
 * Карта сайта собирается из тех же конфигов, что и навигация с проектами.
 * Новый кейс или раздел попадает в неё автоматически — руками ничего
 * поддерживать не нужно.
 */
const sitemap = (): MetadataRoute.Sitemap => {
  const staticRoutes: readonly SitemapRoute[] = getNavigation().map((item) => ({
    path: item.href,
    priority: item.href === '/' ? 1 : 0.8,
    changeFrequency: 'monthly',
  }));

  const projectRoutes: readonly SitemapRoute[] = getProjects().map(
    (project) => ({
      path: `/projects/${project.slug}`,
      priority: project.tier === 'flagship' ? 0.9 : 0.6,
      changeFrequency: 'yearly',
    })
  );

  const lastModified = new Date();

  return [...staticRoutes, ...projectRoutes].flatMap((route) =>
    LOCALES.map((locale) => ({
      url: buildAbsoluteUrl(locale, route.path),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority:
        locale === DEFAULT_LOCALE ? route.priority : route.priority - 0.1,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((alternate) => [
            getHtmlLang(alternate),
            buildAbsoluteUrl(alternate, route.path),
          ])
        ),
      },
    }))
  );
};

export default sitemap;
