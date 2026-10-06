import { z } from 'zod';

import {
  localizedListSchema,
  localizedTextSchema,
  slugSchema,
} from './primitives';

/**
 * Слой фронтенд-архитектуры кейса: узел на graph-диаграмме.
 * items — конкретные модули/зоны ответственности внутри узла.
 */
export const architectureLayerSchema = z.strictObject({
  id: slugSchema,
  label: localizedTextSchema,
  items: localizedListSchema,
});

/** Связь между слоями: направление потока зависимостей / данных. */
export const architectureEdgeSchema = z.strictObject({
  from: slugSchema,
  to: slugSchema,
  label: localizedTextSchema.optional(),
});

export const architectureSchema = z
  .strictObject({
    /** Короткое имя паттерна: FSD, feature-modules, library monorepo и т.п. */
    pattern: localizedTextSchema,
    summary: localizedTextSchema,
    layers: z.array(architectureLayerSchema).min(2).max(8),
    edges: z.array(architectureEdgeSchema).min(1),
  })
  .superRefine((architecture, ctx) => {
    const layerIds = new Set(architecture.layers.map((layer) => layer.id));

    for (const [index, edge] of architecture.edges.entries()) {
      if (edge.from === edge.to) {
        ctx.addIssue({
          code: 'custom',
          message: `edges[${index}]: self-loop «${edge.from}» запрещён`,
          path: ['edges', index],
        });
      }

      if (!layerIds.has(edge.from)) {
        ctx.addIssue({
          code: 'custom',
          message: `edges[${index}]: from «${edge.from}» не найден в layers`,
          path: ['edges', index, 'from'],
        });
      }

      if (!layerIds.has(edge.to)) {
        ctx.addIssue({
          code: 'custom',
          message: `edges[${index}]: to «${edge.to}» не найден в layers`,
          path: ['edges', index, 'to'],
        });
      }
    }
  });

export type TArchitectureLayer = z.infer<typeof architectureLayerSchema>;
export type TArchitectureEdge = z.infer<typeof architectureEdgeSchema>;
export type TArchitecture = z.infer<typeof architectureSchema>;
