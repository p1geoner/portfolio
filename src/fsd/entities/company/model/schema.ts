import { z } from 'zod';

import { localizedTextSchema, slugSchema } from '@/shared/content';

export const companySchema = z.strictObject({
  id: slugSchema,
  name: localizedTextSchema,
  description: localizedTextSchema,
  /** Сайт компании: null, если раскрывать нельзя. */
  url: z.url().nullable(),
});

export const companiesSchema = z.array(companySchema).min(1);

export type TCompany = z.infer<typeof companySchema>;
