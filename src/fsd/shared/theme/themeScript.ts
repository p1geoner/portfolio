import { THEME_ATTRIBUTE, THEME_STORAGE_KEY } from './constants';

/**
 * Скрипт выполняется до первой отрисовки и ставит атрибут темы на <html>.
 * Так тема применяется без вспышки, а страницы остаются статическими:
 * альтернатива с cookie потребовала бы рендера на каждый запрос.
 */
export const getThemeScript = (): string =>
  `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var t=s==='light'||s==='dark'?s:(d?'dark':'light');document.documentElement.setAttribute('${THEME_ATTRIBUTE}',t);}catch(e){document.documentElement.setAttribute('${THEME_ATTRIBUTE}','light');}})();`;
