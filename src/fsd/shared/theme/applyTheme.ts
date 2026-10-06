import {
  THEME_ATTRIBUTE,
  THEME_STORAGE_KEY,
  type TThemeMode,
  isThemeMode,
} from './constants';

const prefersDark = (): boolean =>
  window.matchMedia('(prefers-color-scheme: dark)').matches;

export const resolveTheme = (mode: TThemeMode): 'light' | 'dark' =>
  mode === 'system' ? (prefersDark() ? 'dark' : 'light') : mode;

export const readThemeMode = (): TThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);

    return isThemeMode(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
};

export const applyThemeMode = (mode: TThemeMode): void => {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, resolveTheme(mode));

  try {
    if (mode === 'system') {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  } catch {
    // Приватный режим может запрещать запись — тема всё равно применится.
  }
};
