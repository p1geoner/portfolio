import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const sakhalinHousingProject = {
  slug: 'sakhalin-housing',
  order: 20,
  visibility: 'public',
  tier: 'flagship',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Агрегатор недвижимости ипотечного агентства',
    en: 'Mortgage agency real estate aggregator',
  },
  tagline: {
    ru: 'Портал аренды и покупки жилья с нуля на Next.js: карта, геокодер, бронирование, ипотека',
    en: 'A rental and purchase portal built from scratch on Next.js: map, geocoder, booking, mortgage',
  },
  summary: {
    ru: 'Первый проект, который я вёл с чистого листа: объявления с картой и геопоиском, бронирование домов агентства, ипотечные программы, trade-in и личный кабинет. Дальше — поддержка и развитие продукта.',
    en: 'The first project I started from a blank page: listings with a map and geo search, booking of agency houses, mortgage programmes, trade-in and a user account. Later — ongoing support and evolution.',
  },
  role: {
    ru: 'Frontend-разработчик: разработка с нуля, дальнейшее развитие',
    en: 'Frontend engineer: greenfield development and further evolution',
  },
  period: { from: '2023-02', to: '2025-06' },
  teamSize: 4,
  stack: [
    'nextjs',
    'react',
    'typescript',
    'mobx',
    'scss',
    'formik',
    'leaflet',
    'jest',
    'seo',
    'rest-api',
    'git',
  ],
  highlights: {
    ru: [
      'Разработка с нуля: от структуры проекта и роутинга до продакшена',
      'Карта объявлений на Leaflet с геопоиском адресов через геокодер',
      'Бронирование домов агентства с проверкой доступности и статусами заявок',
      'Ипотечные программы и калькуляторы, сценарий trade-in',
      'ЧПУ на кириллице через rewrites: /obyavleniya, /moi-obyavleniya и другие разделы',
      'Личный кабинет: свои объявления, фотоотчёты, заявки, профиль',
    ],
    en: [
      'Greenfield development: from project structure and routing to production',
      'Listing map on Leaflet with address geo search through a geocoder',
      'Booking of agency houses with availability checks and request statuses',
      'Mortgage programmes and calculators, a trade-in flow',
      'Clean Cyrillic URLs via rewrites: /obyavleniya, /moi-obyavleniya and other sections',
      'User account: own listings, photo reports, requests, profile',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Портал регионального ипотечного агентства: объявления об аренде и продаже жилья, дома самого агентства с возможностью брони, ипотечные программы, застройщики и новости.',
          'Проект начинался с нуля — я делал разметку структуры, роутинг, слой запросов и стор, а затем развивал продукт вместе с новыми требованиями бизнеса.',
        ],
        en: [
          'A portal for a regional mortgage agency: rental and sale listings, the agency’s own houses with booking, mortgage programmes, developers and news.',
          'The project started from scratch — I laid out the structure, routing, request layer and store, and then evolved the product alongside new business requirements.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Главная сложность — геоданные. Объявления нужно было показывать и списком, и на карте, искать по адресу с подсказками, а также хранить координаты, полученные из строки адреса.',
          'Вторая — разнородные сценарии в одном продукте: обычные объявления от пользователей, дома агентства с бронированием, ипотечные программы со своими правилами и trade-in. Каждый со своими формами и статусами.',
        ],
        en: [
          'The main challenge was geo data. Listings had to be shown both as a list and on a map, searchable by address with suggestions, and their coordinates had to be derived from an address string.',
          'The second was the mix of scenarios inside one product: regular user listings, agency houses with booking, mortgage programmes with their own rules, and trade-in. Each with its own forms and statuses.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Карту собрал на Leaflet: точки объявлений группируются, при выборе района подтягивается выдача по видимой области. Поиск адреса работает через геокодер с подсказками, найденные координаты сохраняются вместе с объявлением.',
          'Формы объявлений, бронирования и заявок описал через Formik с общими полями и валидацией: одинаковые шаги переиспользуются между сценариями, а различия остаются в конфигурации формы.',
          'Разделы получили человекопонятные адреса на кириллице через rewrites — публичный URL читается, внутренний роут остаётся латинским.',
          'Утилитарную логику вроде склонения числительных вынес в отдельный слой и покрыл юнит-тестами: такие функции живут во всех разделах, и ломать их регрессией дороже всего.',
        ],
        en: [
          'The map is built on Leaflet: listing points are grouped, and selecting an area loads results for the visible bounds. Address search works through a geocoder with suggestions, and the resolved coordinates are stored with the listing.',
          'Listing, booking and request forms are described with Formik using shared fields and validation: identical steps are reused across scenarios, while the differences stay in the form configuration.',
          'Sections got readable Cyrillic URLs through rewrites — the public URL reads naturally while the internal route stays latin.',
          'Utility logic such as numeral declension was extracted into a separate layer and covered with unit tests: those functions are used in every section, and a regression there is the most expensive kind.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Портал вышел в прод и остался на поддержке: добавлялись программы, разделы и сценарии, при этом базовая структура выдержала два года изменений.',
          'Для меня это был первый опыт полного цикла — от пустого репозитория до релиза и последующего развития, включая разбор багов на проде.',
        ],
        en: [
          'The portal went live and stayed under my support: programmes, sections and flows were added while the original structure survived two years of change.',
          'For me it was the first full-cycle experience — from an empty repository to release and further evolution, including debugging issues in production.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'greenfield',
      value: { ru: 'с нуля', en: 'from scratch' },
      label: {
        ru: 'структура, роутинг, стор и запросы',
        en: 'structure, routing, store and requests',
      },
      estimated: false,
    },
    {
      id: 'sections',
      value: { ru: '20+', en: '20+' },
      label: {
        ru: 'разделов в продакшене',
        en: 'sections in production',
      },
      hint: {
        ru: 'Объявления, карта, бронирование, ипотека, trade-in, фотоотчёты, профиль, новости.',
        en: 'Listings, map, booking, mortgage, trade-in, photo reports, profile, news.',
      },
      estimated: false,
    },
    {
      id: 'lifetime',
      value: { ru: '2 года', en: '2 years' },
      label: {
        ru: 'поддержки после релиза',
        en: 'of support after release',
      },
      estimated: false,
    },
  ],
  media: {
    cover: {
      kind: 'video',
      src: '/media/projects/sakhipoteka_preview.mp4',
      poster: '/media/projects/sakhipoteka_1.png',
      alt: {
        ru: 'Обзор портала Сахалинской ипотеки: поиск жилья и сервисы',
        en: 'Sakhalin mortgage portal walkthrough: property search and services',
      },
      width: 3358,
      height: 1924,
      anonymized: false,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/sakhipoteka_1.png',
        alt: {
          ru: 'Главная страница: поиск недвижимости на Сахалине',
          en: 'Home page: property search in Sakhalin',
        },
        width: 3356,
        height: 1920,
        anonymized: false,
      },
    ],
  },
  links: {},
  architecture: projectArchitectures['sakhalin-housing'],
  related: ['housing-admin', 'navigator-career'],
  keywords: {
    ru: [
      'агрегатор недвижимости',
      'Next.js с нуля',
      'Leaflet карта',
      'геокодер',
      'бронирование',
    ],
    en: [
      'real estate aggregator',
      'greenfield Next.js',
      'Leaflet map',
      'geocoder',
      'booking flow',
    ],
  },
} satisfies TProject;
