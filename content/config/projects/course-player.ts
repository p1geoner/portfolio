import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const coursePlayerProject = {
  slug: 'course-player',
  order: 80,
  visibility: 'nda',
  tier: 'major',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Плеер курсов повышения квалификации',
    en: 'Professional development course player',
  },
  tagline: {
    ru: 'Прохождение курса: лонгриды, вебинары, тесты с перетаскиванием, подсказки GPT по выделенному тексту',
    en: 'Taking a course: longreads, webinars, drag-and-drop tests, GPT hints on selected text',
  },
  summary: {
    ru: 'Приложение, в котором студент проходит курс: дерево модулей, лонгриды и видео-уроки, тесты с разными типами вопросов, прогресс, избранное и уведомления. Отдельная фича — пояснение выделенного фрагмента через GPT.',
    en: 'The application where a student takes a course: a module tree, longreads and video lessons, tests with different question types, progress, favourites and notifications. A separate feature explains a selected fragment through GPT.',
  },
  role: {
    ru: 'Frontend-разработчик: избранное, уведомления, сценарии GPT, поддержка',
    en: 'Frontend engineer: favourites, notifications, GPT scenarios, maintenance',
  },
  period: { from: '2024-06', to: '2026-07' },
  teamSize: 4,
  stack: [
    'react',
    'typescript',
    'mobx',
    'antd',
    'scss',
    'fsd',
    'react-router',
    'oauth-sso',
    'sentry',
    'eslint',
  ],
  highlights: {
    ru: [
      'Дерево модулей и уроков с прогрессом прохождения и навигацией между шагами',
      'Лонгриды и вебинары рендерятся из общей библиотеки контента — так же, как их видел автор',
      'Тесты с ранжированием и сопоставлением ответов через перетаскивание',
      'Пояснение выделенного фрагмента текста через GPT прямо в уроке',
      'Избранное, сохранение материалов урока и лента уведомлений',
      'Авторизация через SSO платформы, ошибки в Sentry',
    ],
    en: [
      'A module and lesson tree with completion progress and navigation between steps',
      'Longreads and webinars render from the shared content library — exactly as the author saw them',
      'Tests with ranking and matching answers via drag and drop',
      'GPT explanation of a selected text fragment right inside the lesson',
      'Favourites, saving lesson materials and a notification feed',
      'Platform SSO authentication, errors reported to Sentry',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Плеер — вторая половина связки с конструктором курсов: то, что автор собрал в редакторе, студент проходит здесь. Урок может быть лонгридом, вебинаром или тестом.',
          'Контент рендерится общей библиотекой, поэтому расхождений между режимом автора и режимом студента не возникает.',
        ],
        en: [
          'The player is the other half of the pair with the course builder: what the author assembles in the editor, the student takes here. A lesson can be a longread, a webinar or a test.',
          'Content is rendered by the shared library, so there is no divergence between the author view and the student view.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Урок, прогресс и тест разделены, поэтому переход по курсу не зависит от того, как считается прохождение. Пояснение к выделенному фрагменту открывается прямо в материале.',
        ],
        en: [
          'The lesson, progress and test stay separate, so moving through the course does not depend on how completion is calculated. An explanation of a selected fragment opens inside the material.',
        ],
      },
    },
  ],
  metrics: [],
  media: { cover: null, gallery: [] },
  architecture: projectArchitectures['course-player'],
  related: ['course-constructor', 'longread-library', 'gpt-assistant'],
  keywords: {
    ru: [
      'плеер курсов',
      'LMS',
      'тесты drag and drop',
      'GPT в обучении',
      'прогресс прохождения',
    ],
    en: [
      'course player',
      'LMS',
      'drag and drop tests',
      'GPT in learning',
      'learning progress',
    ],
  },
} satisfies TProject;
