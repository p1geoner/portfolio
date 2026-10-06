import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const admissionCollegeProject = {
  slug: 'admission-college',
  order: 110,
  visibility: 'nda',
  tier: 'major',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Платформа подачи заявления в колледж',
    en: 'College application platform',
  },
  tagline: {
    ru: 'Тот же сценарий подачи для среднего образования: формы, прогресс, уведомления',
    en: 'The same application flow for vocational education: forms, progress, notifications',
  },
  summary: {
    ru: 'Приёмная кампания колледжа: заявление по шагам, документы, статусы. Делал редизайн, оптимизацию и рефакторинг легаси-кода, переиспользуя подходы из вузовской платформы.',
    en: 'A college admissions campaign: step-by-step application, documents, statuses. I did the redesign, optimisation and legacy refactoring, reusing the approaches from the university platform.',
  },
  role: {
    ru: 'Frontend-разработчик: редизайн, оптимизация, формы, прогресс',
    en: 'Frontend engineer: redesign, optimisation, forms, progress',
  },
  period: { from: '2025-04', to: '2026-04' },
  teamSize: 3,
  stack: [
    'react',
    'typescript',
    'redux-toolkit',
    'react-hook-form',
    'scss',
    'rest-api',
    'gitlab-ci',
  ],
  highlights: {
    ru: [
      'Сценарий подачи заявления, адаптированный под правила среднего профессионального образования',
      'Сохранение прогресса и валидация по шагам',
      'Оптимизация загрузки разделов и разбор легаси-кода',
      'Уведомления о статусе заявления',
      'Переиспользование решений из вузовской платформы вместо повторной разработки',
    ],
    en: [
      'An application flow adapted to vocational education rules',
      'Saved progress and per-step validation',
      'Section loading optimisation and untangling of legacy code',
      'Application status notifications',
      'Reuse of solutions from the university platform instead of building them again',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Колледж принимает по своим правилам, но пользовательский путь тот же: заполнить заявление, приложить документы, дождаться статуса. Делать второй продукт с нуля было бы расточительно.',
          'Основная работа — привести унаследованный код к состоянию, в котором различия между вузом и колледжем выражены конфигурацией, а не копией реализации.',
        ],
        en: [
          'A college admits by its own rules, but the user journey is the same: fill in the application, attach documents, wait for a status. Building a second product from scratch would have been wasteful.',
          'The main work was bringing inherited code to a state where the differences between university and college are expressed by configuration rather than by a copy of the implementation.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Сценарий подачи общий с вузовской платформой: отличия уровня образования задаются настройками, а не отдельной реализацией.',
        ],
        en: [
          'The application flow is shared with the university platform: differences by education level come from settings, not from a separate implementation.',
        ],
      },
    },
  ],
  metrics: [],
  media: { cover: null, gallery: [] },
  architecture: projectArchitectures['admission-college'],
  related: ['admission-university'],
  keywords: {
    ru: [
      'подача заявления',
      'формы с прогрессом',
      'рефакторинг',
      'оптимизация загрузки',
    ],
    en: [
      'application submission',
      'forms with progress',
      'refactoring',
      'load optimisation',
    ],
  },
} satisfies TProject;
