import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const longreadLibraryProject = {
  slug: 'longread-library',
  order: 40,
  visibility: 'nda',
  tier: 'flagship',
  category: 'library',
  companyId: 'lazurm',
  name: {
    ru: 'Библиотека лонгрида',
    en: 'Longread library',
  },
  tagline: {
    ru: 'Переиспользуемый контентный слой: редактор блоков и рендер для студента в одном пакете',
    en: 'A reusable content layer: block editor and student-facing renderer in one package',
  },
  summary: {
    ru: 'Внутренняя библиотека, из которой собираются лонгриды образовательной платформы. Даёт редактор блочного контента для авторов и точно такой же рендер для студентов, поэтому конструктор и плеер не расходятся в отображении.',
    en: 'An internal library that powers the learning platform’s longreads. It provides a block content editor for authors and exactly the same renderer for students, so the builder and the player never diverge visually.',
  },
  role: {
    ru: 'Frontend-разработчик: разработка и развитие библиотеки',
    en: 'Frontend engineer: library development and evolution',
  },
  period: { from: '2024-01', to: null },
  teamSize: 3,
  stack: [
    'react',
    'typescript',
    'zustand',
    'antd',
    'tailwind',
    'scss',
    'eslint',
    'git',
    'code-review',
  ],
  highlights: {
    ru: [
      'Более 400 коммитов в библиотеку, ветвление dev / stable / main для безопасных обновлений потребителей',
      'Блочный редактор на Plate: текст, медиа, вложенные структуры, кастомные блоки под сценарии платформы',
      'Единый рендер для режима редактирования и режима просмотра',
      'Собирается в режиме библиотеки и подключается как зависимость в конструктор и плеер',
      'Управление состоянием редактора на Zustand, доступные примитивы интерфейса на Radix',
      'Перетаскивание блоков и элементов внутри структуры контента',
    ],
    en: [
      'Over 400 commits into the library, with dev / stable / main branching for safe consumer updates',
      'Plate-based block editor: text, media, nested structures, custom blocks for platform scenarios',
      'A single renderer shared by editing and viewing modes',
      'Built in library mode and consumed as a dependency by the builder and the player',
      'Editor state on Zustand, accessible interface primitives on Radix',
      'Drag and drop for blocks and elements inside the content structure',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Зачем библиотека', en: 'Why a library' },
      body: {
        ru: [
          'Лонгрид — основной формат учебного материала на платформе: текст, изображения, вставки, задания. Его создают в конструкторе и проходят в плеере, то есть один и тот же контент нужен двум разным приложениям.',
          'Пока рендер дублировался в каждом приложении, любое изменение блока приходилось повторять дважды, и различия между «как автор видел» и «как студент увидел» появлялись сами.',
        ],
        en: [
          'A longread is the platform’s main learning format: text, images, embeds, assignments. It is created in the builder and consumed in the player, meaning the same content is needed by two different applications.',
          'While rendering was duplicated in each application, any change to a block had to be repeated twice, and the gap between “what the author saw” and “what the student saw” appeared on its own.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Библиотека — публичный контракт: её обновление мгновенно отражается на нескольких продакшн-приложениях. Значит нужна дисциплина версий и такой API, который можно расширять без ломающих изменений.',
          'Редактор блочного контента сам по себе непростая история: вложенность, выделение, вставка из внешних источников, поведение клавиатуры, сохранение структуры документа.',
        ],
        en: [
          'A library is a public contract: updating it instantly affects several production applications. That requires version discipline and an API that can be extended without breaking changes.',
          'A block content editor is a hard problem in itself: nesting, selection, pasting from external sources, keyboard behaviour, preserving the document structure.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Редактирование и просмотр собраны на одном рендере, поэтому автор и студент видят одни и те же блоки. Библиотека подключается в конструктор и плеер отдельным пакетом.',
        ],
        en: [
          'Editing and viewing share one renderer, so the author and the student see the same blocks. The library is a separate package used by the builder and the player.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Библиотека стала общим контентным слоем платформы: новый тип блока добавляется один раз и сразу доступен и авторам, и студентам.',
          'Это моя личная гордость в проекте: работа над кодом, который используют другие разработчики, требует другого уровня аккуратности к API и обратной совместимости, и именно она дала мне понимание, чем библиотека отличается от приложения.',
        ],
        en: [
          'The library became the platform’s shared content layer: a new block type is added once and immediately available to both authors and students.',
          'This is my personal pride in the project: working on code that other developers depend on demands a different level of care about API design and backward compatibility, and it taught me how a library differs from an application.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/longread-lib.png',
      alt: {
        ru: 'Обезличенный интерфейс библиотеки лонгрида под пометкой NDA',
        en: 'Anonymised longread library interface marked NDA',
      },
      width: 1600,
      height: 994,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/longread-lib.png',
        alt: {
          ru: 'Обезличенный интерфейс библиотеки лонгрида под пометкой NDA',
          en: 'Anonymised longread library interface marked NDA',
        },
        width: 1600,
        height: 994,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['longread-library'],
  related: ['course-constructor', 'course-player'],
  keywords: {
    ru: [
      'библиотека компонентов',
      'блочный редактор',
      'Plate',
      'переиспользуемый код',
      'React-библиотека',
    ],
    en: [
      'component library',
      'block editor',
      'Plate',
      'code reuse',
      'React library',
    ],
  },
} satisfies TProject;
