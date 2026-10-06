import type { Metadata } from 'next';

import { getSiteConfig } from '../config';
import { type TLocale, getHtmlLang } from '../content';
import {
  buildAbsoluteUrl,
  buildLanguageAlternates,
  buildLocalePath,
} from './urls';

export type TPageMetadataParams = {
  locale: TLocale;
  /** Путь без префикса локали, например /projects/navigator-career. */
  path: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  type?: 'website' | 'article' | 'profile';
  /** Абсолютный или относительный путь к OG-картинке страницы. */
  ogImage?: string;
  noIndex?: boolean;
};

const site = getSiteConfig();

/**
 * Единственная точка сборки метаданных. Любая страница получает canonical
 * и языковые альтернативы автоматически — забыть их невозможно, потому что
 * страницы не собирают объект Metadata руками.
 */
export const buildPageMetadata = ({
  locale,
  path,
  title,
  description,
  keywords,
  type = 'website',
  ogImage,
  noIndex = false,
}: TPageMetadataParams): Metadata => {
  const canonical = buildLocalePath(locale, path);
  const absoluteUrl = buildAbsoluteUrl(locale, path);
  const images = ogImage === undefined ? undefined : [{ url: ogImage }];

  return {
    title,
    description,
    keywords: keywords === undefined ? undefined : [...keywords],
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      type: type === 'profile' ? 'profile' : type,
      url: absoluteUrl,
      siteName: site.name[locale],
      title,
      description,
      locale: getHtmlLang(locale).replace('-', '_'),
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  };
};
