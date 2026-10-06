import { z } from 'zod';

import {
  localizedListSchema,
  localizedRichTextSchema,
  localizedTextSchema,
  mediaAssetSchema,
  slugSchema,
} from '@/shared/content';

export const CONTACT_CHANNELS = [
  'email',
  'telegram',
  'github',
  'phone',
] as const;

export const contactChannelSchema = z.enum(CONTACT_CHANNELS);

export const contactSchema = z.strictObject({
  channel: contactChannelSchema,
  /**
   * Значение хранится по частям и склеивается в рантайме — примитивная,
   * но рабочая защита от почтовых скрейперов, читающих статический HTML.
   */
  value: z.string().trim().min(1),
  label: localizedTextSchema,
  /** Показывать ли канал публично. */
  visible: z.boolean(),
  preferred: z.boolean(),
});

export const profileFactSchema = z.strictObject({
  id: slugSchema,
  value: localizedTextSchema,
  label: localizedTextSchema,
});

export const profileSchema = z.strictObject({
  name: localizedTextSchema,
  shortName: localizedTextSchema,
  role: localizedTextSchema,
  headline: localizedTextSchema,
  tagline: localizedTextSchema,
  bio: localizedRichTextSchema,
  location: localizedTextSchema,
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  photo: mediaAssetSchema,
  facts: z.array(profileFactSchema),
  contacts: z.array(contactSchema).min(1),
  languages: localizedListSchema,
  /** Строка для JSON-LD Person.jobTitle и мета-описаний. */
  seoKeywords: localizedListSchema,
});

export type TProfile = z.infer<typeof profileSchema>;
export type TContact = z.infer<typeof contactSchema>;
export type TContactChannel = z.infer<typeof contactChannelSchema>;
export type TProfileFact = z.infer<typeof profileFactSchema>;
