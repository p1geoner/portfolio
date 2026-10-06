export const THEME_MODES = ['light', 'dark', 'system'] as const;

export type TThemeMode = (typeof THEME_MODES)[number];

export const THEME_STORAGE_KEY = 'portfolio-theme';

export const THEME_ATTRIBUTE = 'data-theme';

export const DEFAULT_THEME_MODE: TThemeMode = 'system';

export const isThemeMode = (value: unknown): value is TThemeMode =>
  typeof value === 'string' && THEME_MODES.includes(value as TThemeMode);
