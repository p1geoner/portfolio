import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LOCALE, LOCALES } from '../content';

/**
 * localePrefix: 'as-needed' — основной язык живёт на чистых адресах (/projects),
 * второй получает префикс (/en/projects). Так у главной аудитории URL без
 * лишнего сегмента, а языковые версии всё равно различимы для поисковиков
 * через hreflang.
 */
export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'as-needed',
});
