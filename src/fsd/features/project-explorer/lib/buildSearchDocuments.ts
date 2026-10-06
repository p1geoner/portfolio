import type { TProject } from '@/entities/project';
import type { TLocale } from '@/shared/content';
import type { TSearchDocument } from '@/shared/search';

/**
 * Веса полей: совпадение в названии должно поднимать кейс выше, чем
 * совпадение в тексте раздела. Иначе поиск по «Next.js» выдаёт проекты,
 * где технология упомянута мимоходом, раньше тех, где она основная.
 */
const FIELD_WEIGHT = {
  name: 6,
  tagline: 4,
  stack: 4,
  summary: 3,
  keywords: 2,
  highlights: 2,
  role: 1,
  sections: 1,
} as const;

export const buildSearchDocuments = (
  projects: readonly TProject[],
  locale: TLocale,
  stackLabels: Readonly<Record<string, string>>
): readonly TSearchDocument[] =>
  projects.map((project) => ({
    id: project.slug,
    fields: [
      { text: project.name[locale], weight: FIELD_WEIGHT.name },
      { text: project.tagline[locale], weight: FIELD_WEIGHT.tagline },
      {
        text: project.stack
          .map((skillId) => stackLabels[skillId] ?? skillId)
          .join(' '),
        weight: FIELD_WEIGHT.stack,
      },
      { text: project.summary[locale], weight: FIELD_WEIGHT.summary },
      {
        text: project.keywords[locale].join(' '),
        weight: FIELD_WEIGHT.keywords,
      },
      {
        text: project.highlights[locale].join(' '),
        weight: FIELD_WEIGHT.highlights,
      },
      { text: project.role[locale], weight: FIELD_WEIGHT.role },
      {
        text: project.sections
          .map((section) =>
            [section.title[locale], ...section.body[locale]].join(' ')
          )
          .join(' '),
        weight: FIELD_WEIGHT.sections,
      },
    ],
  }));
