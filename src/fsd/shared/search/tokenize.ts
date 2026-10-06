/** Юникодные буквы и цифры: правило работает и для кириллицы, и для латиницы. */
const TOKEN_PATTERN = /[\p{L}\p{N}]+/gu;

const MIN_TOKEN_LENGTH = 2;

/**
 * Нормализация перед индексацией и перед поиском должна быть одинаковой,
 * иначе запрос не найдёт документ. Поэтому обе стороны используют эту функцию.
 */
export const normalize = (text: string): string =>
  text.toLowerCase().replaceAll('ё', 'е').replaceAll('’', "'");

export const tokenize = (text: string): string[] => {
  const matches = normalize(text).match(TOKEN_PATTERN);

  if (matches === null) {
    return [];
  }

  return matches.filter((token) => token.length >= MIN_TOKEN_LENGTH);
};
