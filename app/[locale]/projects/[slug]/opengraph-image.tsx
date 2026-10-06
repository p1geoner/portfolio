import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { getProfile } from '@/entities/profile';
import { getProjectBySlug, getProjectSlugs } from '@/entities/project';
import { getSkillLabels } from '@/entities/skill';
import type { TLocale } from '@/shared/content';
import { routing } from '@/shared/i18n';
import {
  OG_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OgCard,
  loadOgFonts,
} from '@/shared/seo';

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'TProject case study';

export const generateStaticParams = (): Array<{
  locale: string;
  slug: string;
}> =>
  routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug }))
  );

type ImageProps = {
  params: Promise<{ locale: TLocale; slug: string }>;
};

const STACK_TAGS_LIMIT = 4;

const Image = async ({ params }: ImageProps) => {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'projects' });
  const profile = getProfile();
  const skillLabels = getSkillLabels();
  const fonts = await loadOgFonts();

  if (project === null) {
    return new ImageResponse(
      <OgCard
        eyebrow={t('title')}
        title={t('emptyTitle')}
        footerPrimary={profile.name[locale]}
        footerSecondary={profile.role[locale]}
      />,
      { ...size, fonts }
    );
  }

  return new ImageResponse(
    <OgCard
      eyebrow={t(`tier.${project.tier}`)}
      title={project.name[locale]}
      description={project.tagline[locale]}
      footerPrimary={profile.name[locale]}
      footerSecondary={profile.role[locale]}
      tags={project.stack
        .slice(0, STACK_TAGS_LIMIT)
        .map((skillId) => skillLabels[skillId] ?? skillId)}
    />,
    { ...size, fonts }
  );
};

export default Image;
