import { z } from 'zod';

import {
  localizedListSchema,
  localizedTextSchema,
  periodSchema,
  slugSchema,
} from '@/shared/content';

export const EXPERIENCE_KINDS = ['work', 'education'] as const;

export const experienceKindSchema = z.enum(EXPERIENCE_KINDS);

export const experienceGradeSchema = z.strictObject({
  id: slugSchema,
  title: localizedTextSchema,
  period: periodSchema,
});

export const experienceEntrySchema = z.strictObject({
  id: slugSchema,
  kind: experienceKindSchema,
  organization: localizedTextSchema,
  position: localizedTextSchema,
  location: localizedTextSchema,
  period: periodSchema,
  summary: localizedTextSchema,
  responsibilities: localizedListSchema,
  achievements: localizedListSchema,
  /** Рост по грейдам внутри одной компании — рисуется на таймлайне. */
  grades: z.array(experienceGradeSchema),
  /** Слаги проектов, сделанных в рамках этого места работы. */
  projectSlugs: z.array(slugSchema),
});

export const experienceSchema = z.array(experienceEntrySchema).min(1);

export type TExperienceEntry = z.infer<typeof experienceEntrySchema>;
export type TExperienceGrade = z.infer<typeof experienceGradeSchema>;
export type TExperienceKind = z.infer<typeof experienceKindSchema>;
