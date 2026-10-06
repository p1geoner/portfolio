import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const parsingCarsProject = {
  slug: 'parsing-cars',
  order: 140,
  visibility: 'public',
  tier: 'pet',
  category: 'product',
  companyId: 'personal',
  name: {
    ru: 'Агрегатор автообъявлений',
    en: 'Car listings aggregator',
  },
  tagline: {
    ru: 'Пет-проект целиком: парсеры, API, оценка выгодности, Telegram-бот и веб-интерфейс',
    en: 'A full-stack pet project: parsers, API, deal scoring, a Telegram bot and a web interface',
  },
  summary: {
    ru: 'Монорепозиторий, в котором я отвечаю за все слои: парсеры площадок объявлений, API, база, скоринг выгодности предложения, уведомления в Telegram и веб-интерфейс на Next.js.',
    en: 'A monorepo where I own every layer: marketplace parsers, an API, a database, deal scoring, Telegram notifications and a Next.js web interface.',
  },
  role: {
    ru: 'Автор проекта: фронтенд, бэкенд, парсеры, инфраструктура',
    en: 'TProject author: frontend, backend, parsers, infrastructure',
  },
  period: { from: '2026-04', to: '2026-06' },
  stack: [
    'nextjs',
    'app-router',
    'react',
    'typescript',
    'nestjs',
    'tailwind',
    'rest-api',
    'playwright',
    'docker',
  ],
  highlights: {
    ru: [
      'Монорепозиторий из четырёх приложений и трёх общих пакетов',
      'Парсеры площадок на Playwright: устойчивость к изменению разметки и защите от ботов',
      'Скоринг выгодности: сравнение предложения с историей похожих объявлений',
      'Telegram-бот: сохранённые поиски и уведомления о новых подходящих объявлениях',
      'Веб-интерфейс на Next.js App Router с серверными запросами к своему API',
      'Схема базы и типы в общем пакете: одна модель данных на все приложения',
    ],
    en: [
      'A monorepo of four applications and three shared packages',
      'Playwright-based marketplace parsers: resilient to markup changes and bot protection',
      'Deal scoring: comparing an offer against the history of similar listings',
      'A Telegram bot: saved searches and notifications about new matching listings',
      'A Next.js App Router web interface with server-side requests to my own API',
      'Database schema and types in a shared package: one data model for all applications',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Зачем', en: 'Why' },
      body: {
        ru: [
          'Хотелось решить свою задачу — искать выгодные объявления о продаже машин, не просматривая площадки вручную, — и одновременно попробовать полный стек без разделения на «мою» и «чужую» часть.',
          'В рабочих проектах я отвечаю за фронтенд, поэтому здесь специально взял и бэкенд, и парсеры, и инфраструктуру.',
        ],
        en: [
          'I wanted to solve my own problem — finding good car deals without browsing marketplaces by hand — and at the same time try a full stack with no split between “my” and “someone else’s” part.',
          'At work I own the frontend, so here I deliberately took on the backend, the parsers and the infrastructure as well.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Как устроено', en: 'How it works' },
      body: {
        ru: [
          'Парсеры живут отдельным пакетом и запускаются воркером по расписанию. Каждая площадка описана своим адаптером с общим контрактом, поэтому добавление новой не затрагивает остальные.',
          'Собранные объявления складываются в базу через общий слой доступа. Скоринг сравнивает цену конкретного объявления с историей похожих по модели, году и пробегу — так «выгодное» становится числом, а не ощущением.',
          'Веб-интерфейс собран на App Router и запрашивает данные на сервере, а Telegram-бот работает по сохранённым поискам и присылает только новые совпадения.',
        ],
        en: [
          'Parsers live in a separate package and are run by a worker on a schedule. Each marketplace is described by its own adapter behind a shared contract, so adding a new one does not touch the others.',
          'Collected listings go into the database through a shared data access layer. Scoring compares a listing’s price with the history of similar cars by model, year and mileage — turning “a good deal” into a number rather than a feeling.',
          'The web interface is built on the App Router and fetches data on the server, while the Telegram bot works from saved searches and only sends new matches.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'apps',
      value: { ru: '4 приложения', en: '4 applications' },
      label: {
        ru: 'API, воркер, бот и веб в одном репозитории',
        en: 'API, worker, bot and web in one repository',
      },
      estimated: false,
    },
    {
      id: 'sources',
      value: { ru: '3 площадки', en: '3 marketplaces' },
      label: {
        ru: 'подключены адаптерами парсинга',
        en: 'connected through parsing adapters',
      },
      estimated: false,
    },
    {
      id: 'ownership',
      value: { ru: 'весь стек', en: 'full stack' },
      label: {
        ru: 'от парсера до деплоя',
        en: 'from parser to deployment',
      },
      estimated: false,
    },
  ],
  media: { cover: null, gallery: [] },
  links: {},
  architecture: projectArchitectures['parsing-cars'],
  related: ['stoloto-games'],
  keywords: {
    ru: [
      'пет-проект',
      'монорепозиторий',
      'парсинг',
      'NestJS',
      'Telegram бот',
      'Next.js',
    ],
    en: [
      'pet project',
      'monorepo',
      'web scraping',
      'NestJS',
      'Telegram bot',
      'Next.js',
    ],
  },
} satisfies TProject;
