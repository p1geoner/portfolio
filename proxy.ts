import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n';

/**
 * В Next 16 файл называется proxy вместо middleware. Задача одна: определить
 * локаль запроса и переписать путь на сегмент [locale], поэтому страницы
 * остаются статическими.
 */
export default createMiddleware(routing);

export const config = {
  /**
   * Пропускаем служебные пути и файлы: локаль определяется только для страниц.
   * Медиа и статика идут напрямую, чтобы не платить за обработку запроса.
   */
  matcher: ['/((?!api|_next|_vercel|media|.*\\..*).*)'],
};
