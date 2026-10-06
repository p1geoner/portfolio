import type { MetadataRoute } from 'next';

import { getSiteConfig } from '@/shared/config';

const manifest = (): MetadataRoute.Manifest => {
  const site = getSiteConfig();

  return {
    name: site.title[site.defaultLocale],
    short_name: site.name[site.defaultLocale],
    description: site.description[site.defaultLocale],
    start_url: '/',
    display: 'standalone',
    background_color: site.themeColor.light,
    theme_color: site.themeColor.light,
    lang: site.defaultLocale,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
};

export default manifest;
