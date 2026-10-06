import type { z } from 'zod';

export class ContentValidationError extends Error {
  public constructor(
    public readonly source: string,
    public readonly issues: readonly string[]
  ) {
    super(
      `Контент «${source}» не прошёл валидацию:\n` +
        issues.map((issue) => `  • ${issue}`).join('\n')
    );
    this.name = 'ContentValidationError';
  }
}

/**
 * Единая точка разбора конфигов контента. Ошибка бросается на этапе сборки,
 * поэтому невалидный контент физически не может попасть в прод.
 */
export const parseConfig = <TSchema extends z.ZodType>(
  schema: TSchema,
  input: unknown,
  source: string
): z.output<TSchema> => {
  const result = schema.safeParse(input);

  if (!result.success) {
    throw new ContentValidationError(
      source,
      result.error.issues.map(
        (issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`
      )
    );
  }

  return result.data;
};
