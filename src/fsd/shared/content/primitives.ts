import { z } from 'zod';

/**
 * Локали объявлены здесь, а не в i18n-слое, потому что от них зависит
 * форма любого текстового поля в конфигах контента.
 */
export const LOCALES = ['ru', 'en'] as const;

export type TLocale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: TLocale = 'ru';

export const localeSchema = z.enum(LOCALES);

const nonEmptyString = z.string().trim().min(1);

/** Локальный путь внутри public: защищает от внешних ассетов и SSRF-подобных ссылок. */
const publicAssetPath = z
  .string()
  .regex(/^\/[\w\-./]+\.[a-z0-9]{2,5}$/i, 'Ожидается путь внутри /public');

export const localizedTextSchema = z.object({
  ru: nonEmptyString,
  en: nonEmptyString,
});

export const localizedRichTextSchema = z.object({
  ru: z.array(nonEmptyString).min(1),
  en: z.array(nonEmptyString).min(1),
});

export const localizedListSchema = z.object({
  ru: z.array(nonEmptyString),
  en: z.array(nonEmptyString),
});

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Ожидается kebab-case slug');

export const yearMonthSchema = z
  .string()
  .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Ожидается формат YYYY-MM');

export const periodSchema = z.object({
  from: yearMonthSchema,
  /** null — «по настоящее время». */
  to: yearMonthSchema.nullable(),
});

export const mediaKindSchema = z.enum(['image', 'gif', 'video']);

export const mediaAssetSchema = z.object({
  kind: mediaKindSchema,
  src: publicAssetPath,
  /** Постер для video/gif: показывается до загрузки тяжёлого ассета. */
  poster: publicAssetPath.optional(),
  alt: localizedTextSchema,
  caption: localizedTextSchema.optional(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  /** Обезличен ли кадр: обязателен для проектов под NDA. */
  anonymized: z.boolean(),
  /** Плейсхолдер — ассет ещё не загружен, в UI показывается заглушка. */
  pending: z.boolean().optional(),
});

export const externalLinkSchema = z.object({
  url: z.url(),
  label: localizedTextSchema,
});

export type TLocalizedText = z.infer<typeof localizedTextSchema>;
export type TLocalizedRichText = z.infer<typeof localizedRichTextSchema>;
export type TLocalizedList = z.infer<typeof localizedListSchema>;
export type TPeriod = z.infer<typeof periodSchema>;
export type TMediaAsset = z.infer<typeof mediaAssetSchema>;
export type TMediaKind = z.infer<typeof mediaKindSchema>;
export type TExternalLink = z.infer<typeof externalLinkSchema>;
