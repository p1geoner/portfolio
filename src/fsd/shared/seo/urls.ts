import { getSiteConfig } from '../config';
import { type TLocale, LOCALES, getHtmlLang } from '../content';

const site = getSiteConfig();

const normalizePath = (path: string): string => {
  if (path === '' || path === '/') {
    return '';
  }

  return path.startsWith('/') ? path : `/${path}`;
};

/**
 * Путь с учётом стратегии префиксов: язык по умолчанию живёт без сегмента,
 * остальные получают префикс. Одна функция на всё приложение, чтобы
 * canonical, hreflang и карта сайта не расходились между собой.
 */
export const buildLocalePath = (locale: TLocale, path: string): string => {
  const normalized = normalizePath(path);

  if (locale === site.defaultLocale) {
    return normalized === '' ? '/' : normalized;
  }

  return `/${locale}${normalized}`;
};

export const buildAbsoluteUrl = (locale: TLocale, path: string): string =>
  `${site.url}${buildLocalePath(locale, path)}`;

/**
 * Языковые альтернативы для метаданных. x-default указывает на основной язык:
 * так поисковик знает, что отдавать пользователю с неподходящей локалью.
 */
export const buildLanguageAlternates = (
  path: string
): Record<string, string> => {
  const alternates: Record<string, string> = {};

  for (const locale of LOCALES) {
    alternates[getHtmlLang(locale)] = buildAbsoluteUrl(locale, path);
  }

  alternates['x-default'] = buildAbsoluteUrl(site.defaultLocale, path);

  return alternates;
};
