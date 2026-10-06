import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getWorkExperience } from '@/entities/experience';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildExperienceMetadata = async (
  locale: TLocale
): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'experience' });
  const site = getSiteConfig();
  const currentRole = getWorkExperience().at(0);

  return buildPageMetadata({
    locale,
    path: '/experience',
    title: `${t('title')} — ${site.name[locale]}`,
    description:
      currentRole === undefined ? t('subtitle') : currentRole.summary[locale],
  });
};
