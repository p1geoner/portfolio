import type { TSkill } from '@/entities/skill';

/**
 * Стек как направленный граф: dependsOn описывает, на что опирается навык.
 * Из графа страница «Стек» строит уровни топологической сортировкой,
 * а карточка проекта — связи между технологиями.
 * Идентификаторы используются в поле stack у проектов, поэтому переименование
 * навыка требует правки соответствующих проектов (проверяется валидацией).
 */
export const skillsConfig = [
  // Основа
  {
    id: 'javascript',
    name: 'JavaScript',
    group: 'core',
    level: 'advanced',
    dependsOn: [],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    group: 'core',
    level: 'advanced',
    dependsOn: ['javascript'],
    note: {
      ru: 'strict-режим во всех проектах, типы как способ фиксировать доменные правила.',
      en: 'Strict mode in every project, types as a way to encode domain rules.',
    },
  },
  {
    id: 'html',
    name: 'HTML5',
    group: 'core',
    level: 'advanced',
    dependsOn: [],
  },
  { id: 'css', name: 'CSS3', group: 'core', level: 'advanced', dependsOn: [] },
  {
    id: 'rest-api',
    name: 'REST API',
    group: 'core',
    level: 'advanced',
    dependsOn: ['javascript'],
  },
  { id: 'git', name: 'Git', group: 'core', level: 'advanced', dependsOn: [] },

  // Фреймворки
  {
    id: 'react',
    name: 'React',
    group: 'framework',
    level: 'advanced',
    dependsOn: ['javascript', 'typescript'],
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    group: 'framework',
    level: 'advanced',
    dependsOn: ['react'],
    note: {
      ru: 'Pages и App Router, SSR/SSG, миграции с легаси, SEO и производительность.',
      en: 'Pages and App Router, SSR/SSG, legacy migrations, SEO and performance.',
    },
  },
  {
    id: 'app-router',
    name: 'App Router / RSC',
    group: 'framework',
    level: 'confident',
    dependsOn: ['nextjs'],
  },
  {
    id: 'react-router',
    name: 'React Router',
    group: 'framework',
    level: 'advanced',
    dependsOn: ['react'],
  },
  {
    id: 'tanstack-router',
    name: 'TanStack Router',
    group: 'framework',
    level: 'confident',
    dependsOn: ['react', 'typescript'],
  },
  {
    id: 'electron',
    name: 'Electron',
    group: 'framework',
    level: 'working',
    dependsOn: ['javascript'],
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    group: 'framework',
    level: 'working',
    dependsOn: ['typescript'],
  },

  // Состояние и данные
  {
    id: 'mobx',
    name: 'MobX',
    group: 'state',
    level: 'advanced',
    dependsOn: ['react'],
  },
  {
    id: 'zustand',
    name: 'Zustand',
    group: 'state',
    level: 'confident',
    dependsOn: ['react'],
  },
  {
    id: 'redux-toolkit',
    name: 'Redux Toolkit',
    group: 'state',
    level: 'confident',
    dependsOn: ['react'],
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    group: 'state',
    level: 'confident',
    dependsOn: ['react', 'rest-api'],
  },
  {
    id: 'react-ioc',
    name: 'react-ioc (DI)',
    group: 'state',
    level: 'confident',
    dependsOn: ['react', 'mobx'],
    note: {
      ru: 'Внедрение зависимостей для сервисов и сторов вместо глобальных синглтонов.',
      en: 'Dependency injection for services and stores instead of global singletons.',
    },
  },

  // Стилизация
  {
    id: 'scss',
    name: 'SCSS / CSS Modules',
    group: 'styling',
    level: 'advanced',
    dependsOn: ['css'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    group: 'styling',
    level: 'confident',
    dependsOn: ['css'],
  },
  {
    id: 'antd',
    name: 'Ant Design',
    group: 'styling',
    level: 'advanced',
    dependsOn: ['react'],
  },
  {
    id: 'styled-components',
    name: 'styled-components',
    group: 'styling',
    level: 'working',
    dependsOn: ['react', 'css'],
  },

  // Качество
  {
    id: 'eslint',
    name: 'ESLint + Prettier',
    group: 'quality',
    level: 'advanced',
    dependsOn: ['javascript'],
  },
  {
    id: 'vitest',
    name: 'Vitest',
    group: 'quality',
    level: 'confident',
    dependsOn: ['javascript'],
  },
  {
    id: 'jest',
    name: 'Jest',
    group: 'quality',
    level: 'working',
    dependsOn: ['javascript'],
  },
  {
    id: 'playwright',
    name: 'Playwright',
    group: 'quality',
    level: 'confident',
    dependsOn: ['javascript'],
  },
  {
    id: 'storybook',
    name: 'Storybook',
    group: 'quality',
    level: 'confident',
    dependsOn: ['react'],
  },
  {
    id: 'sentry',
    name: 'Sentry',
    group: 'quality',
    level: 'confident',
    dependsOn: ['javascript'],
  },
  {
    id: 'code-review',
    name: 'Код-ревью',
    group: 'quality',
    level: 'advanced',
    dependsOn: [],
    note: {
      ru: 'Ревью на всех проектах команды и онбординг стажёров.',
      en: 'Review across all team projects and intern onboarding.',
    },
  },

  // Инфраструктура
  {
    id: 'docker',
    name: 'Docker',
    group: 'infrastructure',
    level: 'confident',
    dependsOn: [],
  },
  {
    id: 'gitlab-ci',
    name: 'GitLab CI/CD',
    group: 'infrastructure',
    level: 'confident',
    dependsOn: ['docker', 'git'],
  },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    group: 'infrastructure',
    level: 'confident',
    dependsOn: ['git'],
  },
  {
    id: 'nginx',
    name: 'nginx',
    group: 'infrastructure',
    level: 'working',
    dependsOn: [],
  },
  {
    id: 'vercel',
    name: 'Vercel',
    group: 'infrastructure',
    level: 'confident',
    dependsOn: ['nextjs'],
  },

  // Практики и предметные умения
  {
    id: 'fsd',
    name: 'Feature-Sliced Design',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['typescript'],
    note: {
      ru: 'Правила зависимостей проверяются линтером, публичный API слайса — через index.',
      en: 'Dependency rules enforced by a linter, slice public API through index files.',
    },
  },
  {
    id: 'seo',
    name: 'SEO',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['nextjs'],
    note: {
      ru: 'Metadata API, карта сайта из данных, микроразметка, ЧПУ через rewrites.',
      en: 'Metadata API, data-driven sitemaps, structured data, clean URLs via rewrites.',
    },
  },
  {
    id: 'web-vitals',
    name: 'Core Web Vitals',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['nextjs'],
  },
  {
    id: 'a11y',
    name: 'Доступность (a11y)',
    group: 'practice',
    level: 'confident',
    dependsOn: ['html'],
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['javascript'],
  },
  {
    id: 'sse-streaming',
    name: 'SSE / стриминг ответов',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['javascript'],
    note: {
      ru: 'Чтение потока через ReadableStream и посимвольный рендер ответа модели.',
      en: 'Reading the stream via ReadableStream and rendering the model answer as it arrives.',
    },
  },
  {
    id: 'web-push',
    name: 'Web Push',
    group: 'practice',
    level: 'confident',
    dependsOn: ['javascript'],
  },
  {
    id: 'oauth-sso',
    name: 'OAuth2 / SSO',
    group: 'practice',
    level: 'confident',
    dependsOn: ['rest-api'],
  },
  {
    id: 'formik',
    name: 'Formik + Yup',
    group: 'practice',
    level: 'advanced',
    dependsOn: ['react'],
  },
  {
    id: 'react-hook-form',
    name: 'React Hook Form',
    group: 'practice',
    level: 'confident',
    dependsOn: ['react'],
  },
  {
    id: 'zod',
    name: 'Zod',
    group: 'practice',
    level: 'confident',
    dependsOn: ['typescript'],
  },
  {
    id: 'leaflet',
    name: 'Leaflet / геокодинг',
    group: 'practice',
    level: 'confident',
    dependsOn: ['javascript'],
  },
  {
    id: 'virtualization',
    name: 'Виртуализация списков',
    group: 'practice',
    level: 'confident',
    dependsOn: ['react'],
  },
] satisfies TSkill[];
