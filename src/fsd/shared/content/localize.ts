import type {
  TLocale,
  TLocalizedList,
  TLocalizedRichText,
  TLocalizedText,
} from './primitives';

export const pickText = (value: TLocalizedText, locale: TLocale): string =>
  value[locale];

export const pickList = (
  value: TLocalizedList | TLocalizedRichText,
  locale: TLocale
): readonly string[] => value[locale];

export const pickOptionalText = (
  value: TLocalizedText | undefined,
  locale: TLocale
): string | undefined => (value ? value[locale] : undefined);
