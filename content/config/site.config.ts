import type { TSiteConfig } from '@/shared/config';

/**
 * Базовый конфиг сайта. Здесь меняются домен, язык по умолчанию,
 * коды подтверждения для поисковиков и включение отдельных возможностей.
 */
export const siteConfig = {
  url: 'https://dmitrii-nikolaev.ru',
  name: {
    ru: 'Дмитрий Николаев',
    en: 'Dmitrii Nikolaev',
  },
  title: {
    ru: 'Дмитрий Николаев — Frontend-разработчик (Next.js, React, TypeScript)',
    en: 'Dmitrii Nikolaev — Frontend Engineer (Next.js, React, TypeScript)',
  },
  description: {
    ru: 'Middle Frontend на Next.js и React: 16 продакшен-кейсов — агрегаторы, EdTech, AI. FSD, SEO, Core Web Vitals. Тверь → удалёнка.',
    en: 'Mid-level Frontend on Next.js and React: 16 production cases — aggregators, EdTech, AI. FSD, SEO, Core Web Vitals. Based in Tver, open to remote.',
  },
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  themeColor: {
    light: '#faf9f7',
    dark: '#12110f',
  },
  // Коды из Google Search Console и Яндекс.Вебмастера — вставить после деплоя.
  verification: {},
  features: {
    speedInsights: false,
    themeSwitcher: true,
    projectArchitecture: false,
  },
} satisfies TSiteConfig;
