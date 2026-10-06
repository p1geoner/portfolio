import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getProfile } from '@/entities/profile';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildContactsMetadata = async (
  locale: TLocale
): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'contacts' });
  const site = getSiteConfig();
  const profile = getProfile();

  return buildPageMetadata({
    locale,
    path: '/contacts',
    title: `${t('title')} — ${site.name[locale]}`,
    description: `${profile.name[locale]}, ${profile.role[locale]}. ${t('subtitle')}.`,
  });
};
