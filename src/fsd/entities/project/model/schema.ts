import { z } from 'zod';

import {
  architectureSchema,
  localizedListSchema,
  localizedRichTextSchema,
  localizedTextSchema,
  mediaAssetSchema,
  periodSchema,
  slugSchema,
} from '@/shared/content';

export const PROJECT_TIERS = ['flagship', 'major', 'support', 'pet'] as const;

export const PROJECT_CATEGORIES = [
  'product',
  'admin',
  'library',
  'infrastructure',
  'hackathon',
] as const;

export const PROJECT_SECTION_KINDS = [
  'context',
  'challenge',
  'solution',
  'result',
] as const;

export const projectTierSchema = z.enum(PROJECT_TIERS);
export const projectCategorySchema = z.enum(PROJECT_CATEGORIES);

export const projectMetricSchema = z.strictObject({
  id: slugSchema,
  value: localizedTextSchema,
  label: localizedTextSchema,
  hint: localizedTextSchema.optional(),
  /** Оценка, а не замер: в UI помечается, чтобы не выдавать за точные данные. */
  estimated: z.boolean(),
});

export const projectSectionSchema = z.strictObject({
  id: slugSchema,
  kind: z.enum(PROJECT_SECTION_KINDS),
  title: localizedTextSchema,
  body: localizedRichTextSchema,
});

export const projectLinksSchema = z.strictObject({
  production: z.url().optional(),
  repository: z.url().optional(),
  publication: z.url().optional(),
});

/** Кадр, пригодный к публикации под NDA: обезличивание обязательно. */
const anonymizedMediaSchema = mediaAssetSchema.extend({
  anonymized: z.literal(true),
});

const mediaBlockSchema = <TAsset extends z.ZodType>(asset: TAsset) =>
  z.strictObject({
    cover: asset.nullable(),
    gallery: z.array(asset),
  });

const projectBaseShape = {
  slug: slugSchema,
  /** Меньше — выше в выдаче. Позволяет управлять порядком без правки кода. */
  order: z.number().int().nonnegative(),
  tier: projectTierSchema,
  category: projectCategorySchema,
  companyId: slugSchema,
  name: localizedTextSchema,
  tagline: localizedTextSchema,
  summary: localizedTextSchema,
  role: localizedTextSchema,
  period: periodSchema,
  teamSize: z.number().int().positive().optional(),
  /** Идентификаторы навыков из skills.config — связывают проект с графом стека. */
  stack: z.array(slugSchema).min(1),
  highlights: localizedListSchema,
  sections: z.array(projectSectionSchema),
  metrics: z.array(projectMetricSchema),
  /** Слоёная схема фронтенда — рисуется на странице кейса. */
  architecture: architectureSchema,
  related: z.array(slugSchema),
  keywords: localizedListSchema,
};

export const publicProjectSchema = z.strictObject({
  ...projectBaseShape,
  visibility: z.literal('public'),
  links: projectLinksSchema,
  media: mediaBlockSchema(mediaAssetSchema),
});

/**
 * Вариант под NDA: ключа links в схеме нет вовсе, а медиа обязано быть
 * обезличенным. Нарушение ловится и компилятором, и валидацией сборки —
 * соблюдение NDA не зависит от внимательности редактора контента.
 */
export const ndaProjectSchema = z.strictObject({
  ...projectBaseShape,
  visibility: z.literal('nda'),
  media: mediaBlockSchema(anonymizedMediaSchema),
});

export const projectSchema = z.discriminatedUnion('visibility', [
  publicProjectSchema,
  ndaProjectSchema,
]);

export const projectsSchema = z
  .array(projectSchema)
  .min(1)
  .superRefine((projects, ctx) => {
    const slugs = new Set<string>();

    for (const project of projects) {
      if (slugs.has(project.slug)) {
        ctx.addIssue({
          code: 'custom',
          message: `Дубликат slug: ${project.slug}`,
        });
      }
      slugs.add(project.slug);
    }

    for (const project of projects) {
      for (const relatedSlug of project.related) {
        if (!slugs.has(relatedSlug)) {
          ctx.addIssue({
            code: 'custom',
            message: `${project.slug}: related ссылается на несуществующий slug «${relatedSlug}»`,
          });
        }

        if (relatedSlug === project.slug) {
          ctx.addIssue({
            code: 'custom',
            message: `${project.slug}: related ссылается сам на себя`,
          });
        }
      }
    }
  });

export type TProject = z.infer<typeof projectSchema>;
export type TPublicProject = z.infer<typeof publicProjectSchema>;
export type TNdaProject = z.infer<typeof ndaProjectSchema>;
export type TProjectTier = z.infer<typeof projectTierSchema>;
export type TProjectCategory = z.infer<typeof projectCategorySchema>;
export type TProjectMetric = z.infer<typeof projectMetricSchema>;
export type TProjectSection = z.infer<typeof projectSectionSchema>;
export type TProjectLinks = z.infer<typeof projectLinksSchema>;
