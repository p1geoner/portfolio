'use client';

import { useLayoutEffect } from 'react';

import { useAppLocale } from '../i18n';

import { readThemeMode, resolveTheme } from './applyTheme';
import { THEME_ATTRIBUTE } from './constants';

/**
 * Возвращает data-theme, если клиентская навигация его стёрла.
 * Запись в localStorage не трогаем: выбор пользователя уже сохранён.
 */
const syncThemeAttribute = (): void => {
  const resolved = resolveTheme(readThemeMode());

  if (document.documentElement.getAttribute(THEME_ATTRIBUTE) !== resolved) {
    document.documentElement.setAttribute(THEME_ATTRIBUTE, resolved);
  }
};

/**
 * Смена локали заново рисует <html> без атрибута темы, а инлайновый
 * скрипт при мягкой навигации не выполняется. Наблюдатель возвращает
 * атрибут в том же кадре, до отрисовки.
 */
export const ThemePersistence = () => {
  const locale = useAppLocale();

  useLayoutEffect(() => {
    syncThemeAttribute();

    const observer = new MutationObserver(syncThemeAttribute);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [THEME_ATTRIBUTE],
    });

    return () => {
      observer.disconnect();
    };
  }, [locale]);

  return null;
};
