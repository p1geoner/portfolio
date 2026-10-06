import type { Thing } from 'schema-dts';

const SCHEMA_CONTEXT = 'https://schema.org';

type JsonLdProps = {
  data: Thing;
};

/**
 * Экранируем < внутри JSON: без этого строка вида "</script>" в данных
 * закрыла бы тег и превратилась в исполняемую разметку.
 */
const serialize = (data: Thing): string =>
  JSON.stringify({
    '@context': SCHEMA_CONTEXT,
    // Типы schema-dts — размеченные объединения, спред union-типа TypeScript
    // не разрешает; для сериализации достаточно трактовать значение как объект.
    ...(data as object),
  }).replaceAll('<', '\\u003c');

export const JsonLd = ({ data }: JsonLdProps) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: serialize(data) }}
  />
);
