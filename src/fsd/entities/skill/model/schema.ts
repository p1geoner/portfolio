import { z } from 'zod';

import { localizedTextSchema, slugSchema } from '@/shared/content';

export const SKILL_GROUPS = [
  'core',
  'framework',
  'state',
  'styling',
  'quality',
  'infrastructure',
  'practice',
] as const;

export const SKILL_LEVELS = ['advanced', 'confident', 'working'] as const;

export const skillGroupSchema = z.enum(SKILL_GROUPS);
export const skillLevelSchema = z.enum(SKILL_LEVELS);

export const skillSchema = z.strictObject({
  id: slugSchema,
  name: z.string().trim().min(1),
  group: skillGroupSchema,
  level: skillLevelSchema,
  /**
   * Технологии, на которые опирается навык. Формируют направленный граф:
   * из него строятся уровни (топологическая сортировка) и связи в UI.
   */
  dependsOn: z.array(slugSchema),
  note: localizedTextSchema.optional(),
});

export const skillsSchema = z
  .array(skillSchema)
  .min(1)
  .superRefine((skills, ctx) => {
    const ids = new Set(skills.map((skill) => skill.id));

    for (const skill of skills) {
      for (const dependencyId of skill.dependsOn) {
        if (!ids.has(dependencyId)) {
          ctx.addIssue({
            code: 'custom',
            message: `${skill.id}: dependsOn ссылается на неизвестный навык «${dependencyId}»`,
          });
        }

        if (dependencyId === skill.id) {
          ctx.addIssue({
            code: 'custom',
            message: `${skill.id}: навык не может зависеть от себя`,
          });
        }
      }
    }
  });

export type TSkill = z.infer<typeof skillSchema>;
export type TSkillGroup = z.infer<typeof skillGroupSchema>;
export type TSkillLevel = z.infer<typeof skillLevelSchema>;
