import type { MetadataRoute } from 'next';

import { getSiteConfig } from '@/shared/config';

const robots = (): MetadataRoute.Robots => {
  const site = getSiteConfig();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Служебные пути индексировать нечего.
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
};

export default robots;
