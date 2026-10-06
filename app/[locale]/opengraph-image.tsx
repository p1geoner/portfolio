import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

import { getProfile } from '@/entities/profile';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import {
  OG_CONTENT_TYPE,
  OG_IMAGE_SIZE,
  OgCard,
  loadOgFonts,
} from '@/shared/seo';
import { routing } from '@/shared/i18n';

export const size = OG_IMAGE_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Dmitrii Nikolaev — Frontend Engineer';

export const generateStaticParams = (): Array<{ locale: string }> =>
  routing.locales.map((locale) => ({ locale }));

type ImageProps = {
  params: Promise<{ locale: TLocale }>;
};

const Image = async ({ params }: ImageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const site = getSiteConfig();
  const profile = getProfile();
  const fonts = await loadOgFonts();

  return new ImageResponse(
    <OgCard
      eyebrow={profile.role[locale]}
      title={profile.headline[locale]}
      description={profile.tagline[locale]}
      footerPrimary={profile.name[locale]}
      footerSecondary={site.url.replace('https://', '')}
      tags={[t('heroBadge')]}
    />,
    { ...size, fonts }
  );
};

export default Image;
