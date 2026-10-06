'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { LOCALES, getLocaleLabel, getLocaleShortLabel } from '@/shared/content';
import { Link, useAppLocale, usePathname } from '@/shared/i18n';
import { VisuallyHidden } from '@/shared/ui';

/**
 * Ссылки, а не кнопки: поисковик видит связь языковых версий, а пользователь
 * может открыть версию в новой вкладке. Текущий путь сохраняется.
 */
export const LocaleSwitcher = () => {
  const activeLocale = useAppLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav
      aria-label={t('localeSwitcher')}
      className='flex items-center rounded-[var(--radius-pill)] border border-[var(--border-subtle)] p-0.5'
    >
      <VisuallyHidden>{t('localeSwitcher')}</VisuallyHidden>
      {LOCALES.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={isActive ? 'true' : undefined}
            className={clsx(
              'rounded-[var(--radius-pill)] px-2.5 py-1 font-mono text-xs transition-colors duration-200',
              isActive
                ? 'bg-[var(--surface-sunken)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            )}
            title={getLocaleLabel(locale)}
          >
            {getLocaleShortLabel(locale)}
          </Link>
        );
      })}
    </nav>
  );
};
