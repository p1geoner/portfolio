import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const admissionUniversityProject = {
  slug: 'admission-university',
  order: 100,
  visibility: 'nda',
  tier: 'major',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Платформа подачи заявления в вуз',
    en: 'University application platform',
  },
  tagline: {
    ru: 'Многошаговые формы с сохранением прогресса, валидацией и подписью документов',
    en: 'Multi-step forms with saved progress, validation and document signing',
  },
  summary: {
    ru: 'Сервис приёмной кампании: абитуриент заполняет заявление по шагам, прикладывает документы, подписывает их и следит за статусом. Занимался редизайном, рефакторингом легаси и логикой форм.',
    en: 'An admissions service: the applicant fills in the application step by step, attaches documents, signs them and tracks the status. I worked on the redesign, legacy refactoring and form logic.',
  },
  role: {
    ru: 'Frontend-разработчик: редизайн, рефакторинг легаси, формы, уведомления',
    en: 'Frontend engineer: redesign, legacy refactoring, forms, notifications',
  },
  period: { from: '2025-01', to: null },
  teamSize: 4,
  stack: [
    'react',
    'typescript',
    'redux-toolkit',
    'react-hook-form',
    'styled-components',
    'rest-api',
    'docker',
    'gitlab-ci',
  ],
  highlights: {
    ru: [
      'Многошаговая подача заявления для нескольких видов программ: бакалавриат, дополнительное образование, аспирантура',
      'Сохранение прогресса: заполненное не теряется между шагами и сессиями',
      'Валидация на каждом шаге с понятными сообщениями вместо общей ошибки формы',
      'Загрузка и предпросмотр документов, подписание заявления',
      'Уведомления о статусе заявления в личном кабинете',
      'Рефакторинг легаси-кода в процессе редизайна, без остановки приёмной кампании',
    ],
    en: [
      'Multi-step application for several programme types: bachelor’s, continuing education, postgraduate',
      'Saved progress: entered data is not lost between steps and sessions',
      'Per-step validation with clear messages instead of one generic form error',
      'Document upload and preview, application signing',
      'Application status notifications in the user workspace',
      'Legacy refactoring during the redesign, without pausing the admissions campaign',
    ],
  },
  sections: [
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Заявление — длинная форма с ветвлениями: набор шагов зависит от типа программы, часть полей обязательна условно, документы прикладываются по правилам.',
          'Цена ошибки высокая: абитуриент заполняет заявление в приёмную кампанию, и потеря введённых данных или непонятная ошибка валидации напрямую бьёт по конверсии.',
          'При этом код доставался в наследство: разные подходы к формам, дублирующиеся проверки, слабая типизация ответов.',
        ],
        en: [
          'An application is a long branching form: the set of steps depends on the programme type, some fields are conditionally required, documents are attached by rules.',
          'The cost of a mistake is high: the applicant fills the form during the admissions campaign, and losing entered data or showing an unclear validation error hits conversion directly.',
          'On top of that the code was inherited: different approaches to forms, duplicated checks, weak typing of responses.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Заявление заполняется по шагам с сохранением прогресса: ошибка видна у поля, а возврат к черновику не начинает всё заново.',
        ],
        en: [
          'An application is filled in step by step with saved progress: an error sits next to the field, and returning to a draft does not start from scratch.',
        ],
      },
    },
  ],
  metrics: [],
  media: { cover: null, gallery: [] },
  architecture: projectArchitectures['admission-university'],
  related: ['admission-college', 'instudy-platform'],
  keywords: {
    ru: [
      'многошаговые формы',
      'валидация форм',
      'Redux Toolkit',
      'React Hook Form',
      'рефакторинг легаси',
    ],
    en: [
      'multi-step forms',
      'form validation',
      'Redux Toolkit',
      'React Hook Form',
      'legacy refactoring',
    ],
  },
} satisfies TProject;
