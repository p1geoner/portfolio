import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const FONT_DIRECTORY = join(
  process.cwd(),
  'src',
  'fsd',
  'shared',
  'seo',
  'assets'
);

export type TOgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 600;
  style: 'normal';
};

/**
 * Латиница и кириллица лежат отдельными подмножествами: генератор картинок
 * не имеет системных шрифтов, а без кириллического файла русские заголовки
 * отрисовались бы пустыми прямоугольниками.
 * Семейства названы по-разному, чтобы работал фолбэк по покрытию глифов.
 */
export const loadOgFonts = async (): Promise<TOgFont[]> => {
  const [latinRegular, cyrillicRegular, latinSemibold, cyrillicSemibold] =
    await Promise.all([
      readFile(join(FONT_DIRECTORY, 'inter-latin-400.ttf')),
      readFile(join(FONT_DIRECTORY, 'inter-cyrillic-400.ttf')),
      readFile(join(FONT_DIRECTORY, 'inter-latin-600.ttf')),
      readFile(join(FONT_DIRECTORY, 'inter-cyrillic-600.ttf')),
    ]);

  const toArrayBuffer = (buffer: Buffer): ArrayBuffer =>
    buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength
    ) as ArrayBuffer;

  return [
    {
      name: 'InterLatin',
      data: toArrayBuffer(latinRegular),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'InterCyrillic',
      data: toArrayBuffer(cyrillicRegular),
      weight: 400,
      style: 'normal',
    },
    {
      name: 'InterLatin',
      data: toArrayBuffer(latinSemibold),
      weight: 600,
      style: 'normal',
    },
    {
      name: 'InterCyrillic',
      data: toArrayBuffer(cyrillicSemibold),
      weight: 600,
      style: 'normal',
    },
  ];
};

export const OG_FONT_FAMILY = 'InterLatin, InterCyrillic';

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export const OG_CONTENT_TYPE = 'image/png';
