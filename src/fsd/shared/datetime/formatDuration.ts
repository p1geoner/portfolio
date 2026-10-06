import { splitDuration } from './period';

export type TDurationTranslate = (
  key: 'durationYears' | 'durationMonths',
  values: { count: number }
) => string;

/**
 * «3 года 5 месяцев» вместо «41 месяц». Склонение отдаёт ICU-формат из
 * словарей, поэтому правила множественного числа не живут в коде.
 */
export const formatDuration = (
  totalMonths: number,
  translate: TDurationTranslate
): string => {
  const { years, months } = splitDuration(totalMonths);
  const parts: string[] = [];

  if (years > 0) {
    parts.push(translate('durationYears', { count: years }));
  }

  if (months > 0 || years === 0) {
    parts.push(translate('durationMonths', { count: months }));
  }

  return parts.join(' ');
};
