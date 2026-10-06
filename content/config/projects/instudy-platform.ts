import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const instudyPlatformProject = {
  slug: 'instudy-platform',
  order: 50,
  visibility: 'nda',
  tier: 'flagship',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Образовательная платформа: единая точка входа',
    en: 'Learning platform: a single entry point',
  },
  tagline: {
    ru: 'Личный кабинет студента после редизайна: чаты в реальном времени, нативные уведомления, две сборки',
    en: 'A redesigned student workspace: real-time chats, native notifications, two builds',
  },
  summary: {
    ru: 'Кабинет, из которого студент попадает во все сервисы вуза: расписание, курсы, библиотека, финансы, практика, портфолио. Участвовал в редизайне и переводе на современный стек, делал чаты на WebSocket и систему уведомлений, включая нативные push.',
    en: 'The workspace from which a student reaches every university service: schedule, courses, library, finance, internships, portfolio. I took part in the redesign and the move to a modern stack, and built WebSocket chats and the notification system including native push.',
  },
  role: {
    ru: 'Frontend-разработчик: редизайн, чаты, уведомления, оптимизация',
    en: 'Frontend engineer: redesign, chats, notifications, optimisation',
  },
  period: { from: '2025-03', to: null },
  teamSize: 6,
  stack: [
    'react',
    'typescript',
    'tanstack-router',
    'tanstack-query',
    'zustand',
    'zod',
    'antd',
    'scss',
    'websocket',
    'web-push',
    'oauth-sso',
    'virtualization',
    'a11y',
    'sentry',
  ],
  highlights: {
    ru: [
      'Две сборки под разные устройства: desktop и mobile с общим доменным слоем',
      'Чаты в реальном времени: свой WebSocket-клиент с ping/pong, подписками на каналы и авторизацией соединения',
      'Уведомления: живая доставка по сокету, история в интерфейсе и нативные push через Web Push API',
      'Виртуализация длинных списков чатов и диалогов вместо постраничной подгрузки',
      'Единая авторизация через SSO с несколькими профилями у одного пользователя',
      'Схемы Zod на границе данных и типизированный роутинг с генерацией дерева маршрутов',
      'Режим для слабовидящих как отдельная тема оформления',
    ],
    en: [
      'Two builds for different devices: desktop and mobile sharing a domain layer',
      'Real-time chats: a custom WebSocket client with ping/pong, channel subscriptions and connection auth',
      'Notifications: live delivery over the socket, in-app history and native push through the Web Push API',
      'Virtualised long chat and conversation lists instead of paginated loading',
      'Single sign-on with several profiles per user',
      'Zod schemas at the data boundary and typed routing with a generated route tree',
      'A dedicated visually-impaired theme',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Платформа собирает в одном кабинете всё, что нужно студенту: расписание, курсы и материалы, электронную библиотеку, финансы, практику, выпускную работу, опросы и переписку с преподавателями.',
          'Проект прошёл редизайн и смену стека: интерфейс собран на актуальном React с типизированным роутером, серверное состояние ведёт кеширующий слой запросов, клиентское — компактные сторы.',
        ],
        en: [
          'The platform brings everything a student needs into one workspace: schedule, courses and materials, the digital library, finance, internships, the thesis, surveys and messaging with teachers.',
          'The project went through a redesign and a stack change: the interface is built on modern React with a typed router, server state is handled by a caching query layer, client state by compact stores.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Сложность в реальном времени. Чаты и уведомления должны приходить мгновенно, при этом соединение обязано переживать спящий таб, потерю сети и переключение профиля.',
          'Вторая сложность — объёмы. У активного студента десятки диалогов и сотни сообщений, и наивный рендер списка чатов заметно проседает на мобильных устройствах.',
          'Третья — два клиента. Desktop и mobile отличаются интерфейсом, но не доменной логикой, и дублировать правила авторизации, уведомлений и запросов между ними было бы прямой дорогой к рассинхрону.',
        ],
        en: [
          'The difficulty is real time. Chats and notifications must arrive instantly, while the connection has to survive a sleeping tab, network loss and profile switching.',
          'The second difficulty is volume. An active student has dozens of conversations and hundreds of messages, and a naive chat list render noticeably degrades on mobile devices.',
          'The third is two clients. Desktop and mobile differ in interface but not in domain logic, and duplicating authentication, notification and request rules between them would lead straight to drift.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Чаты и уведомления приходят в реальном времени, в том числе когда вкладка закрыта. Длинные списки остаются отзывчивыми, а правила для desktop и mobile описаны один раз.',
        ],
        en: [
          'Chats and notifications arrive in real time, including when the tab is closed. Long lists stay responsive, and the rules for desktop and mobile are described once.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Кабинет получил живые чаты и уведомления, которые доходят до пользователя даже с закрытой вкладкой, а списки перестали тормозить на длинной истории.',
          'Для меня это самый современный стек из рабочих проектов: типизированный роутер, кеширующий слой запросов и схемы на границе данных вместе дают ощутимо меньше рантайм-сюрпризов, чем привычная связка стора и ручных запросов.',
        ],
        en: [
          'The workspace got live chats and notifications that reach the user even with the tab closed, and lists stopped lagging on long histories.',
          'For me this is the most modern stack among my work projects: a typed router, a caching query layer and schemas at the data boundary together produce noticeably fewer runtime surprises than the usual store-plus-manual-requests combination.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/instudy_1.png',
      alt: {
        ru: 'Обезличенный кабинет образовательной платформы под пометкой NDA',
        en: 'Anonymised learning platform workspace marked NDA',
      },
      width: 1672,
      height: 941,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/instudy_1.png',
        alt: {
          ru: 'Обезличенный кабинет образовательной платформы под пометкой NDA',
          en: 'Anonymised learning platform workspace marked NDA',
        },
        width: 1672,
        height: 941,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['instudy-platform'],
  related: ['instudy-marketplace', 'course-player', 'gpt-assistant'],
  keywords: {
    ru: [
      'образовательная платформа',
      'WebSocket чаты',
      'Web Push',
      'TanStack Router',
      'виртуализация списков',
    ],
    en: [
      'learning platform',
      'WebSocket chats',
      'Web Push',
      'TanStack Router',
      'list virtualisation',
    ],
  },
} satisfies TProject;
