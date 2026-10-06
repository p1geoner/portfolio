import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { PropsWithChildren } from 'react';

import { AppShell } from '@/app';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { routing } from '@/shared/i18n';

type LocaleLayoutProps = PropsWithChildren<{
  params: Promise<{ locale: string }>;
}>;

const site = getSiteConfig();

export const generateStaticParams = (): Array<{ locale: string }> =>
  routing.locales.map((locale) => ({ locale }));

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  authors: [{ name: site.name.ru, url: site.url }],
  creator: site.name.ru,
  applicationName: site.name.ru,
  formatDetection: { telephone: false, email: false, address: false },
  verification: {
    ...(site.verification.google === undefined
      ? {}
      : { google: site.verification.google }),
    ...(site.verification.yandex === undefined
      ? {}
      : { yandex: site.verification.yandex }),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: site.themeColor.light },
    { media: '(prefers-color-scheme: dark)', color: site.themeColor.dark },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
};

const LocaleLayout = async ({ children, params }: LocaleLayoutProps) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Без этого вызова страницы рендерились бы динамически на каждый запрос.
  setRequestLocale(locale);

  return <AppShell locale={locale as TLocale}>{children}</AppShell>;
};

export default LocaleLayout;
