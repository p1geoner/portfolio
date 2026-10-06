import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const instudyMarketplaceProject = {
  slug: 'instudy-marketplace',
  order: 70,
  visibility: 'nda',
  tier: 'major',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Платформа с курсами: витрина и кабинеты',
    en: 'Course platform: storefront and workspaces',
  },
  tagline: {
    ru: 'Каталог курсов на Next.js плюс LMS для студентов, преподавателей и администраторов',
    en: 'A Next.js course catalogue plus an LMS for students, teachers and administrators',
  },
  summary: {
    ru: 'Два приложения одного продукта: публичная витрина курсов с серверным рендером и каталогом, и внутренняя платформа обучения с личными кабинетами, аналитикой и админ-панелью для преподавателей.',
    en: 'Two applications of one product: a public course storefront with server rendering and a catalogue, and an internal learning platform with user workspaces, analytics and an admin panel for teachers.',
  },
  role: {
    ru: 'Frontend-разработчик: каталог, кабинеты, админ-панель, аналитика',
    en: 'Frontend engineer: catalogue, workspaces, admin panel, analytics',
  },
  period: { from: '2023-11', to: '2025-10' },
  teamSize: 5,
  stack: [
    'nextjs',
    'app-router',
    'react',
    'typescript',
    'mobx',
    'react-ioc',
    'antd',
    'scss',
    'fsd',
    'react-router',
    'sentry',
    'seo',
  ],
  highlights: {
    ru: [
      'Публичная витрина на Next.js App Router: серверный рендер каталога и страниц курсов',
      'Метаданные курса собираются на сервере из данных сущности, а не подставляются на клиенте',
      'Каталог с фильтрами, подборками, экспертами и событиями',
      'Кабинеты трёх ролей: студент, преподаватель, администратор',
      'Админ-панель курсов: содержание, тесты, авторы, цены, комментарии',
      'Аналитика по пользователям, курсам и платформе на графиках',
    ],
    en: [
      'A public storefront on the Next.js App Router: server-rendered catalogue and course pages',
      'Course metadata is assembled on the server from entity data instead of being injected on the client',
      'Catalogue with filters, collections, experts and events',
      'Workspaces for three roles: student, teacher, administrator',
      'Course admin panel: contents, tests, authors, pricing, comments',
      'Analytics on users, courses and the platform in charts',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Платформа закрывает весь путь: пользователь находит курс в публичном каталоге, покупает его и продолжает обучение в личном кабинете, а преподаватель ведёт содержание и проверяет работы.',
          'Публичная и внутренняя части разделены осознанно: витрине нужен серверный рендер и индексация, кабинету — насыщенный интерфейс и быстрый переход между разделами.',
        ],
        en: [
          'The platform covers the whole path: a user finds a course in the public catalogue, buys it and continues learning in a personal workspace, while a teacher maintains the content and grades submissions.',
          'The public and internal parts are deliberately separate: the storefront needs server rendering and indexing, the workspace needs a rich interface and fast section switching.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Каталог курсов отдаётся с сервера, а кабинеты студента, преподавателя и администратора собраны на общей структуре. Новые разделы добавляются по тому же шаблону, что и уже существующие.',
        ],
        en: [
          'The course catalogue is served from the server, and the student, teacher and administrator workspaces share one structure. New sections follow the same pattern as the ones already there.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Витрина индексируется и открывается быстро, а кабинеты трёх ролей живут в общей архитектуре, где типовая CRUD-задача решается по единому шаблону.',
          'Этот проект стал для меня эталоном связки FSD + MobX + DI, которую я потом переносил в другие продукты команды.',
        ],
        en: [
          'The storefront is indexable and loads fast, while the three role workspaces live in a shared architecture where a typical CRUD task follows one pattern.',
          'This project became my reference for the FSD + MobX + DI combination, which I later carried into other team products.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/marketplace.png',
      alt: {
        ru: 'Обезличенная витрина платформы с курсами под пометкой NDA',
        en: 'Anonymised course platform storefront marked NDA',
      },
      width: 1600,
      height: 900,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/marketplace.png',
        alt: {
          ru: 'Обезличенная витрина платформы с курсами под пометкой NDA',
          en: 'Anonymised course platform storefront marked NDA',
        },
        width: 1600,
        height: 900,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['instudy-marketplace'],
  related: ['course-constructor', 'course-player', 'instudy-platform'],
  keywords: {
    ru: ['LMS', 'каталог курсов', 'Next.js SSR', 'админ-панель', 'MobX'],
    en: ['LMS', 'course catalogue', 'Next.js SSR', 'admin panel', 'MobX'],
  },
} satisfies TProject;
