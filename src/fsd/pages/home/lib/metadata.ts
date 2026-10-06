import type { Metadata } from 'next';

import { getProfile } from '@/entities/profile';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildHomeMetadata = (locale: TLocale): Metadata => {
  const site = getSiteConfig();
  const profile = getProfile();

  return buildPageMetadata({
    locale,
    path: '/',
    title: site.title[locale],
    description: site.description[locale],
    keywords: profile.seoKeywords[locale],
    type: 'profile',
  });
};
