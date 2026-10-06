import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const navigatorAdminProject = {
  slug: 'navigator-admin',
  order: 120,
  visibility: 'public',
  tier: 'support',
  category: 'admin',
  companyId: 'lazurm',
  name: {
    ru: 'Админ-панель агрегатора вакансий',
    en: 'Job aggregator admin panel',
  },
  tagline: {
    ru: 'Около сорока сущностей под управлением: вакансии, компании, статьи, мероприятия, конструкторы форм',
    en: 'Around forty managed entities: vacancies, companies, articles, events, form builders',
  },
  summary: {
    ru: 'Внутренняя панель модерации и наполнения агрегатора вакансий. Правки, поддержка, исправление багов и рефакторинг: единый CRUD-шаблон вместо десятков разнородных страниц.',
    en: 'The internal moderation and content panel for the job aggregator. Changes, maintenance, bug fixes and refactoring: one CRUD pattern instead of dozens of dissimilar pages.',
  },
  role: {
    ru: 'Frontend-разработчик: доработки, багфиксы, рефакторинг',
    en: 'Frontend engineer: changes, bug fixes, refactoring',
  },
  period: { from: '2023-08', to: null },
  teamSize: 4,
  stack: [
    'react',
    'typescript',
    'mobx',
    'formik',
    'scss',
    'react-router',
    'rest-api',
  ],
  highlights: {
    ru: [
      'Около 40 сущностей в одном интерфейсе: от вакансий и резюме до чемпионатов и мер поддержки',
      'Единый шаблон CRUD-страниц: список, создание, редактирование, просмотр',
      'Конструктор форм и конструктор калькуляторов для контент-менеджеров',
      'Редактор статей на блочном редакторе, рассылки, отчёты',
      'Управление стендами и павильонами мероприятий',
    ],
    en: [
      'Around 40 entities in one interface: from vacancies and resumes to championships and support measures',
      'A single CRUD page pattern: list, create, edit, view',
      'A form builder and a calculator builder for content managers',
      'Block-editor based article authoring, mailings, reports',
      'Management of event stands and pavilions',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Панель обслуживает публичный агрегатор: здесь модерируются вакансии и резюме, наполняются статьи и мероприятия, настраиваются справочники и формы.',
          'Основная работа здесь — не новые фичи, а скорость внесения изменений: контент-менеджерам нужно управлять десятками разных сущностей.',
        ],
        en: [
          'The panel serves the public aggregator: vacancies and resumes are moderated here, articles and events are filled in, reference data and forms are configured.',
          'The main work here is not new features but the speed of change: content managers need to manage dozens of different entities.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Свёл страницы к одному набору сценариев: список с фильтрами, форма создания, форма редактирования и режим просмотра. Новая сущность подключается по этому шаблону, а различия остаются в описании полей.',
          'Такой подход убрал главный источник багов в админках — расхождение поведения между похожими разделами, сделанными в разное время разными людьми.',
        ],
        en: [
          'I reduced the pages to one set of scenarios: a filtered list, a create form, an edit form and a view mode. A new entity plugs into this pattern while the differences stay in the field description.',
          'That removed the main source of bugs in admin panels — behavioural drift between similar sections built at different times by different people.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'entities',
      value: { ru: '~40 сущностей', en: '~40 entities' },
      label: {
        ru: 'под управлением в одной панели',
        en: 'managed in one panel',
      },
      estimated: false,
    },
    {
      id: 'pattern',
      value: { ru: '1 шаблон', en: '1 pattern' },
      label: {
        ru: 'на все CRUD-разделы',
        en: 'for every CRUD section',
      },
      estimated: false,
    },
  ],
  media: { cover: null, gallery: [] },
  links: {},
  architecture: projectArchitectures['navigator-admin'],
  related: ['navigator-career', 'housing-admin'],
  keywords: {
    ru: ['админ-панель', 'CRUD', 'конструктор форм', 'MobX', 'модерация'],
    en: ['admin panel', 'CRUD', 'form builder', 'MobX', 'moderation'],
  },
} satisfies TProject;
