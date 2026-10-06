import type { TLocale, TPeriod } from '../content';

export type TMonthInterval = {
  readonly start: number;
  readonly end: number;
};

/** Год и месяц в единое число месяцев: сравнивать и вычитать проще, чем даты. */
export const toMonthIndex = (yearMonth: string): number => {
  const [year, month] = yearMonth.split('-');

  return Number(year) * 12 + (Number(month) - 1);
};

export const fromMonthIndex = (monthIndex: number): Date =>
  new Date(Math.floor(monthIndex / 12), monthIndex % 12, 1);

export const getCurrentMonthIndex = (): number => {
  const now = new Date();

  return now.getFullYear() * 12 + now.getMonth();
};

export const toMonthInterval = (period: TPeriod): TMonthInterval => ({
  start: toMonthIndex(period.from),
  end: period.to === null ? getCurrentMonthIndex() : toMonthIndex(period.to),
});

export const getPeriodMonths = (period: TPeriod): number => {
  const { start, end } = toMonthInterval(period);

  return Math.max(1, end - start + 1);
};

/**
 * Слияние пересекающихся интервалов: суммарный опыт нельзя считать сложением
 * периодов проектов — они идут параллельно, и месяцы задвоились бы.
 * Сортировка по началу и один проход дают O(n log n).
 */
export const mergeIntervals = (
  intervals: readonly TMonthInterval[]
): readonly TMonthInterval[] => {
  if (intervals.length === 0) {
    return [];
  }

  const sorted = [...intervals].sort((left, right) => left.start - right.start);
  const merged: TMonthInterval[] = [];

  for (const interval of sorted) {
    const last = merged.at(-1);

    if (last === undefined || interval.start > last.end + 1) {
      merged.push({ ...interval });
      continue;
    }

    if (interval.end > last.end) {
      merged[merged.length - 1] = { start: last.start, end: interval.end };
    }
  }

  return merged;
};

export const getTotalMonths = (periods: readonly TPeriod[]): number =>
  mergeIntervals(periods.map(toMonthInterval)).reduce(
    (total, interval) => total + (interval.end - interval.start + 1),
    0
  );

const MONTH_FORMAT: Record<TLocale, Intl.DateTimeFormatOptions> = {
  ru: { month: 'long', year: 'numeric' },
  en: { month: 'short', year: 'numeric' },
};

export const formatYearMonth = (yearMonth: string, locale: TLocale): string =>
  new Intl.DateTimeFormat(locale, MONTH_FORMAT[locale]).format(
    fromMonthIndex(toMonthIndex(yearMonth))
  );

export const formatPeriod = (
  period: TPeriod,
  locale: TLocale,
  presentLabel: string
): string => {
  const from = formatYearMonth(period.from, locale);
  const to =
    period.to === null ? presentLabel : formatYearMonth(period.to, locale);

  return `${from} — ${to}`;
};

export type TDurationParts = {
  readonly years: number;
  readonly months: number;
};

export const splitDuration = (totalMonths: number): TDurationParts => ({
  years: Math.floor(totalMonths / 12),
  months: totalMonths % 12,
});
