import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/**
 * Проект под NDA: ключа links в схеме нет, а все кадры в media обязаны быть
 * помечены anonymized: true. Как добавить медиа — см. content/README.md.
 */
export const courseConstructorProject = {
  slug: 'course-constructor',
  order: 30,
  visibility: 'nda',
  tier: 'flagship',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Конструктор курсов',
    en: 'Course builder',
  },
  tagline: {
    ru: 'Редактор образовательных программ: дерево модулей, лонгриды, тесты, публикация',
    en: 'An authoring tool for learning programmes: module tree, longreads, tests, publishing',
  },
  summary: {
    ru: 'Инструмент, в котором методисты и преподаватели собирают курсы: структура из модулей и уроков, контентный редактор лонгридов, конструктор тестов, проекты и публикация в плеер. Мой самый долгий проект — больше семисот коммитов.',
    en: 'The tool where instructional designers and teachers assemble courses: a module and lesson tree, a longread content editor, a test builder, projects and publishing to the player. My longest-running project — over seven hundred commits.',
  },
  role: {
    ru: 'Frontend-разработчик: фичи, рефакторинг, оптимизация, ревью',
    en: 'Frontend engineer: features, refactoring, optimisation, review',
  },
  period: { from: '2023-09', to: null },
  teamSize: 5,
  stack: [
    'react',
    'typescript',
    'mobx',
    'react-ioc',
    'antd',
    'scss',
    'fsd',
    'react-router',
    'sentry',
    'eslint',
    'gitlab-ci',
    'code-review',
  ],
  highlights: {
    ru: [
      'Больше 700 коммитов: от отдельных фич до перестройки слоёв приложения',
      'Дерево модулей и уроков с перетаскиванием, переносом и массовыми операциями',
      'Редактор лонгридов на собственной библиотеке — один контентный слой на конструктор и плеер',
      'Конструктор тестов: типы вопросов, ранжирование, сопоставление, проверка ответов',
      'Сценарии с GPT: уточнение и доработка содержания курса прямо в редакторе',
      'Строгие правила зависимостей по FSD, проверяемые линтером на CI',
    ],
    en: [
      'Over 700 commits: from individual features to reshaping application layers',
      'Module and lesson tree with drag and drop, moving and bulk operations',
      'Longread editor on an in-house library — a single content layer for the builder and the player',
      'Test builder: question types, ranking, matching, answer validation',
      'GPT scenarios: refining and extending course content directly in the editor',
      'Strict FSD dependency rules verified by a linter in CI',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Конструктор — точка входа для авторов курсов. Здесь собирается программа: модули, уроки, лонгриды, вебинары, тесты и проекты. Результат уходит в плеер, где его проходят студенты.',
          'Продукт живой: требования появляются от методистов, преподавателей и администраторов, поэтому редактор постоянно обрастает новыми типами контента и правилами.',
        ],
        en: [
          'The builder is the entry point for course authors. Here the programme is assembled: modules, lessons, longreads, webinars, tests and projects. The result goes to the player where students take it.',
          'The product is alive: requirements come from instructional designers, teachers and administrators, so the editor constantly gains new content types and rules.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Главная сложность редактора — состояние. Дерево курса, черновики блоков, порядок элементов, незакоммиченные правки и валидация живут одновременно, а пользователь ожидает, что ничего не потеряется.',
          'Вторая сложность — общий контент с плеером. Один и тот же лонгрид должен редактироваться в конструкторе и одинаково отображаться студенту, иначе автор не понимает, что увидит группа.',
          'Третья — рост кодовой базы. За несколько лет редактор из набора страниц превратился в большое приложение, и без формальных правил зависимостей связи между модулями быстро запутались бы.',
        ],
        en: [
          'The editor’s main difficulty is state. The course tree, block drafts, element order, uncommitted edits and validation all live at once, while the user expects nothing to be lost.',
          'The second is content shared with the player. The same longread must be editable in the builder and render identically for the student, otherwise the author cannot tell what the group will see.',
          'The third is codebase growth. Over several years the editor turned from a set of pages into a large application, and without formal dependency rules the links between modules would quickly become tangled.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Конструктор и плеер используют один контентный слой: автор редактирует те же блоки, которые видит студент. Новые типы материалов добавляются, не ломая уже собранные курсы.',
        ],
        en: [
          'The builder and the player share one content layer: the author edits the same blocks the student sees. New material types can be added without breaking courses that already exist.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Конструктор — продукт, где я проработал дольше всего и где видно накопленный эффект: структура приложения выдержала несколько волн новых требований, а типовая фича перестала требовать правок в половине кодовой базы.',
          'Этим проектом я горжусь больше остальных: он объединяет и архитектурную работу, и продуктовые сценарии, и переиспользуемую библиотеку, которая живёт своей жизнью в других приложениях.',
        ],
        en: [
          'The builder is the product I worked on the longest and where the accumulated effect is visible: the application structure survived several waves of new requirements, and a typical feature no longer requires edits across half of the codebase.',
          'This is the project I am most proud of: it combines architectural work, product scenarios and a reusable library that lives its own life in other applications.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/course-editor.png',
      alt: {
        ru: 'Обезличенный интерфейс конструктора курсов под пометкой NDA',
        en: 'Anonymised course builder interface marked NDA',
      },
      width: 1600,
      height: 900,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/course-editor.png',
        alt: {
          ru: 'Обезличенный интерфейс конструктора курсов под пометкой NDA',
          en: 'Anonymised course builder interface marked NDA',
        },
        width: 1600,
        height: 900,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['course-constructor'],
  related: ['longread-library', 'course-player', 'instudy-marketplace'],
  keywords: {
    ru: [
      'конструктор курсов',
      'LMS',
      'редактор контента',
      'MobX',
      'Feature-Sliced Design',
    ],
    en: [
      'course builder',
      'LMS',
      'content editor',
      'MobX',
      'Feature-Sliced Design',
    ],
  },
} satisfies TProject;
