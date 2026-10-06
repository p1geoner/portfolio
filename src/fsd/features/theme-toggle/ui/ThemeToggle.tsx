'use client';

import { useTranslations } from 'next-intl';

import { THEME_ATTRIBUTE, applyThemeMode } from '@/shared/theme';
import { Button, MoonIcon, SunIcon, VisuallyHidden } from '@/shared/ui';

/**
 * Иконки переключаются CSS-вариантом по атрибуту темы, а не состоянием React.
 * Поэтому кнопка не зависит от гидратации: до загрузки JS она уже показывает
 * правильную иконку и не вызывает расхождения разметки.
 */
export const ThemeToggle = () => {
  const t = useTranslations('nav');

  const handleClick = (): void => {
    const isDark =
      document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'dark';

    applyThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={handleClick}
      title={t('themeSwitcher')}
    >
      <SunIcon className='block size-[18px] shrink-0 dark:hidden' />
      <MoonIcon className='hidden size-[18px] shrink-0 dark:block' />
      <VisuallyHidden>{t('themeSwitcher')}</VisuallyHidden>
    </Button>
  );
};
