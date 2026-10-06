import type { TLocale } from './primitives';

/**
 * Языковые теги и подписи живут рядом с определением локалей, а не в
 * i18n-слое: их использует и SEO-слой, которому клиентская навигация
 * next-intl не нужна.
 */
const HTML_LANG: Record<TLocale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
};

const LOCALE_LABEL: Record<TLocale, string> = {
  ru: 'Русский',
  en: 'English',
};

const LOCALE_SHORT_LABEL: Record<TLocale, string> = {
  ru: 'RU',
  en: 'EN',
};

export const getHtmlLang = (locale: TLocale): string => HTML_LANG[locale];

export const getLocaleLabel = (locale: TLocale): string => LOCALE_LABEL[locale];

export const getLocaleShortLabel = (locale: TLocale): string =>
  LOCALE_SHORT_LABEL[locale];
