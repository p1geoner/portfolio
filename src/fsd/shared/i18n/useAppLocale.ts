import { useLocale } from 'next-intl';

import { type TLocale, LOCALES } from '../content';

/**
 * Локаль в виде союзного типа, а не произвольной строки: индексация
 * локализованных полей контента становится безопасной по типам.
 */
export const useAppLocale = (): TLocale => {
  const locale = useLocale();

  return LOCALES.includes(locale as TLocale) ? (locale as TLocale) : LOCALES[0];
};
