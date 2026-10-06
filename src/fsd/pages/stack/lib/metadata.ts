import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getSkills } from '@/entities/skill';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { buildPageMetadata } from '@/shared/seo';

export const buildStackMetadata = async (
  locale: TLocale
): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'stack' });
  const site = getSiteConfig();
  const skills = getSkills();

  return buildPageMetadata({
    locale,
    path: '/stack',
    title: `${t('title')} — ${site.name[locale]}`,
    description: `${t('subtitle')}: ${skills
      .slice(0, 12)
      .map((skill) => skill.name)
      .join(', ')}.`,
    keywords: skills.map((skill) => skill.name),
  });
};
