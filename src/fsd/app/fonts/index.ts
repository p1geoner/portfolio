import { Inter, JetBrains_Mono } from 'next/font/google';

/**
 * Оба шрифта с кириллицей и латиницей: интерфейс двуязычный.
 * display: swap, чтобы текст был виден сразу и не портил LCP.
 */
export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-mono-jetbrains',
  weight: ['400', '500'],
  preload: false,
});
