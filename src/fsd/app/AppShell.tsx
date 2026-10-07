import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import type { PropsWithChildren } from 'react';

import { getHeaderNavigation, getSiteConfig } from '@/shared/config';
import { type TLocale, getHtmlLang } from '@/shared/content';
import { ThemePersistence, getThemeScript } from '@/shared/theme';
import { BackToTop, ScrollProgress, SmoothScroll } from '@/shared/ui';
import { AmbientBackground } from '@/widgets/ambient-background';
import { SiteFooter } from '@/widgets/site-footer';
import { SiteHeader } from '@/widgets/site-header';

import { inter, jetBrainsMono } from './fonts';

import './styles/globals.css';

type IAppShellProps = PropsWithChildren<{
  locale: TLocale;
}>;

export const AppShell = ({ children, locale }: IAppShellProps) => {
  const site = getSiteConfig();

  const headerItems = getHeaderNavigation().map((item) => ({
    id: item.id,
    href: item.href,
    label: item.label[locale],
  }));

  return (
    <html
      lang={getHtmlLang(locale)}
      className={`${inter.variable} ${jetBrainsMono.variable}`}
      // Атрибут темы ставит инлайновый скрипт до первой отрисовки,
      // поэтому серверная разметка заведомо отличается от клиентской.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
      </head>
      <body className='relative flex min-h-dvh flex-col antialiased'>
        <NextIntlClientProvider>
          <ThemePersistence />
          <SmoothScroll />
          <AmbientBackground />
          <ScrollProgress />
          <div className='relative z-10 flex min-h-dvh flex-1 flex-col'>
            <SiteHeader
              navItems={headerItems}
              showThemeToggle={site.features.themeSwitcher}
            />

            <main id='main' className='flex-1'>
              {children}
            </main>

            <SiteFooter />
            <BackToTop />
          </div>
          {site.features.analytics ? <Analytics /> : null}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
