'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { LocaleSwitcher } from '@/features/locale-switch';
import { ThemeToggle } from '@/features/theme-toggle';
import { Link, usePathname } from '@/shared/i18n';
import { CloseIcon, Container, VisuallyHidden } from '@/shared/ui';

export type THeaderNavItem = {
  readonly id: string;
  readonly href: string;
  readonly label: string;
};

type SiteHeaderProps = {
  navItems: readonly THeaderNavItem[];
  showThemeToggle: boolean;
};

export const SiteHeader = ({ navItems, showThemeToggle }: SiteHeaderProps) => {
  const pathname = usePathname();
  const t = useTranslations('nav');
  const common = useTranslations('common');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  /**
   * Наблюдатель за невидимым маркером вместо обработчика scroll:
   * браузер сам сообщает о пересечении, поэтому на каждый пиксель прокрутки
   * не выполняется JavaScript.
   */
  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (sentinel === null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(entry !== undefined && !entry.isIntersecting);
      },
      { rootMargin: '-8px 0px 0px 0px', threshold: 1 }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <a
        href='#main'
        className='sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[var(--radius-pill)] focus:bg-[var(--brand)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--brand-contrast)]'
      >
        {common('skipToContent')}
      </a>

      <div
        ref={sentinelRef}
        aria-hidden='true'
        className='absolute top-0 h-px w-full'
      />

      <header
        className={clsx(
          'sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300',
          scrolled
            ? 'border-b border-[var(--border-subtle)] bg-[color-mix(in_oklab,var(--surface-page)_82%,transparent)] backdrop-blur-md'
            : 'border-b border-transparent'
        )}
      >
        <Container className='flex h-16 items-center justify-between gap-4'>
          <Link
            href='/'
            className='font-mono text-sm tracking-[0.16em] uppercase transition-colors duration-200 hover:text-[var(--brand)]'
          >
            d.nikolaev
          </Link>

          <nav
            aria-label={t('ariaLabel')}
            className='hidden items-center gap-1 md:flex'
          >
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'rounded-[var(--radius-pill)] px-3 py-2 text-sm transition-colors duration-200',
                    isActive
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className='flex items-center gap-2'>
            <LocaleSwitcher />
            {showThemeToggle ? <ThemeToggle /> : null}

            <button
              type='button'
              aria-expanded={mobileOpen}
              aria-controls='mobile-nav'
              onClick={() => setMobileOpen((current) => !current)}
              className='inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border-subtle)] md:hidden'
            >
              {mobileOpen ? (
                <CloseIcon width={16} height={16} />
              ) : (
                <span aria-hidden='true' className='flex flex-col gap-1'>
                  <span className='block h-0.5 w-4 bg-current' />
                  <span className='block h-0.5 w-4 bg-current' />
                </span>
              )}
              <VisuallyHidden>{common('menu')}</VisuallyHidden>
            </button>
          </div>
        </Container>

        {mobileOpen ? (
          <div
            id='mobile-nav'
            className='border-t border-[var(--border-subtle)] bg-[var(--surface-page)] md:hidden'
          >
            <Container className='flex flex-col py-3'>
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  // Меню закрывается по клику, а не эффектом на смену пути:
                  // так нет лишнего каскадного рендера после навигации.
                  onClick={() => setMobileOpen(false)}
                  className='rounded-md px-2 py-3 text-base text-[var(--text-secondary)] transition-colors duration-200 hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]'
                >
                  {item.label}
                </Link>
              ))}
            </Container>
          </div>
        ) : null}
      </header>
    </>
  );
};
