import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const stolotoGamesProject = {
  slug: 'stoloto-games',
  order: 150,
  visibility: 'public',
  tier: 'pet',
  category: 'hackathon',
  companyId: 'hackathons',
  name: {
    ru: 'Быстрые игры для VIP-клиентов (хакатон)',
    en: 'Fast games for VIP customers (hackathon)',
  },
  tagline: {
    ru: 'MVP за считанные дни: игровые комнаты, раунды по WebSocket, бусты и бонусные баллы',
    en: 'An MVP in a matter of days: game rooms, WebSocket rounds, boosts and bonus points',
  },
  summary: {
    ru: 'Хакатон-проект: сервис быстрых игр с комнатами, раундами в реальном времени, бустами и начислением бонусов. Отвечал за фронтенд и связку с сокет-сервером.',
    en: 'A hackathon project: a fast-games service with rooms, real-time rounds, boosts and bonus accrual. I was responsible for the frontend and the socket server integration.',
  },
  role: {
    ru: 'Frontend-разработчик в команде хакатона',
    en: 'Frontend engineer on the hackathon team',
  },
  period: { from: '2026-04', to: '2026-04' },
  teamSize: 5,
  stack: [
    'react',
    'typescript',
    'zustand',
    'tanstack-query',
    'websocket',
    'scss',
    'fsd',
    'git',
  ],
  highlights: {
    ru: [
      'Игровые комнаты с состоянием раунда в реальном времени',
      'Синхронизация таймеров и результатов через WebSocket',
      'Бусты и начисление бонусных баллов',
      'История комнат и админский раздел',
      'Архитектура по FSD даже в условиях хакатона — чтобы четыре человека не мешали друг другу в коде',
    ],
    en: [
      'Game rooms with real-time round state',
      'Timer and result synchronisation over WebSocket',
      'Boosts and bonus point accrual',
      'Room history and an admin section',
      'FSD architecture even under hackathon pressure — so four people would not collide in the code',
    ],
  },
  sections: [
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Условия', en: 'Constraints' },
      body: {
        ru: [
          'Хакатон — это жёсткий срок и параллельная работа нескольких человек по одному репозиторию. Ошибка в организации кода стоит дороже, чем в обычном проекте: переписывать некогда.',
          'Продуктовая часть требовала реального времени: несколько игроков в комнате видят один и тот же раунд, таймер и результат.',
        ],
        en: [
          'A hackathon means a hard deadline and several people working in one repository at once. A mistake in code organisation costs more than in a regular project: there is no time to rewrite.',
          'The product side required real time: several players in a room see the same round, timer and result.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Что сделали', en: 'What we did' },
      body: {
        ru: [
          'Сразу разложили проект по слоям FSD и договорились о границах: каждый работал в своих слайсах, конфликты в общем коде свелись к минимуму.',
          'Состояние раунда синхронизируется по сокету, серверные данные кешируются слоем запросов, а локальные состояния интерфейса лежат в компактных сторах. Это дало предсказуемое поведение без лишней инфраструктуры.',
        ],
        en: [
          'We split the project into FSD layers immediately and agreed on the boundaries: everyone worked in their own slices and conflicts in shared code were minimal.',
          'Round state is synchronised over the socket, server data is cached by the query layer, and local interface state lives in compact stores. That gave predictable behaviour without extra infrastructure.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'timeline',
      value: { ru: 'дни', en: 'days' },
      label: {
        ru: 'от идеи до работающего демо',
        en: 'from idea to a working demo',
      },
      estimated: false,
    },
    {
      id: 'realtime',
      value: { ru: 'реальное время', en: 'real time' },
      label: {
        ru: 'раунды и результаты по сокету',
        en: 'rounds and results over the socket',
      },
      estimated: false,
    },
  ],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/stoloto.png',
      alt: {
        ru: 'Рулетка хакатона: колесо бонусов, выбор места и игровая комната',
        en: 'Hackathon roulette: bonus wheel, seat pick and a game room',
      },
      width: 2792,
      height: 1900,
      anonymized: false,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/stoloto.png',
        alt: {
          ru: 'Рулетка хакатона: колесо бонусов, выбор места и игровая комната',
          en: 'Hackathon roulette: bonus wheel, seat pick and a game room',
        },
        width: 2792,
        height: 1900,
        anonymized: false,
      },
    ],
  },
  links: {},
  architecture: projectArchitectures['stoloto-games'],
  related: ['parsing-cars', 'instudy-platform'],
  keywords: {
    ru: ['хакатон', 'WebSocket', 'реальное время', 'Zustand', 'FSD'],
    en: ['hackathon', 'WebSocket', 'real time', 'Zustand', 'FSD'],
  },
} satisfies TProject;
