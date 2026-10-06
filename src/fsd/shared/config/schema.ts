import { z } from 'zod';

import { LOCALES, localizedTextSchema, slugSchema } from '../content';

export const siteConfigSchema = z.strictObject({
  /** Канонический origin без завершающего слэша — основа для canonical и OG. */
  url: z.url().refine((value) => !value.endsWith('/'), {
    message: 'URL не должен заканчиваться слэшем',
  }),
  name: localizedTextSchema,
  title: localizedTextSchema,
  description: localizedTextSchema,
  locales: z.array(z.enum(LOCALES)).min(1),
  defaultLocale: z.enum(LOCALES),
  themeColor: z.strictObject({
    light: z.string().regex(/^#[0-9a-f]{6}$/i),
    dark: z.string().regex(/^#[0-9a-f]{6}$/i),
  }),
  verification: z.strictObject({
    google: z.string().optional(),
    yandex: z.string().optional(),
  }),
  features: z.strictObject({
    /** Web Analytics Vercel: единственный внешний скрипт, разрешённый в CSP. */
    analytics: z.boolean(),
    themeSwitcher: z.boolean(),
    /** Вкладка и секция архитектуры в карточках и на странице кейса. */
    projectArchitecture: z.boolean(),
  }),
});

export const navigationItemSchema = z.strictObject({
  id: slugSchema,
  /** Путь без префикса локали: локаль добавляет i18n-слой. */
  href: z.string().regex(/^\/[a-z0-9\-/]*$/),
  label: localizedTextSchema,
  showInHeader: z.boolean(),
  showInFooter: z.boolean(),
});

export const navigationSchema = z.array(navigationItemSchema).min(1);

export type TSiteConfig = z.infer<typeof siteConfigSchema>;
export type TNavigationItem = z.infer<typeof navigationItemSchema>;
