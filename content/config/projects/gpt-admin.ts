import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const gptAdminProject = {
  slug: 'gpt-admin',
  order: 90,
  visibility: 'nda',
  tier: 'support',
  category: 'admin',
  companyId: 'lazurm',
  name: {
    ru: 'Админ-панель GPT-помощника',
    en: 'GPT assistant admin panel',
  },
  tagline: {
    ru: 'Конструктор шаблонов: шаги, блоки, циклы и условия перехода',
    en: 'Template builder: steps, blocks, loops and transition conditions',
  },
  summary: {
    ru: 'Внутренний инструмент, где собираются сценарии для GPT-помощника: иерархия шагов и блоков, условия перехода, циклы, ассистенты, пользователи и интеграции.',
    en: 'An internal tool where GPT assistant scenarios are assembled: a hierarchy of steps and blocks, transition conditions, loops, assistants, users and integrations.',
  },
  role: {
    ru: 'Frontend-разработчик: конструктор шаблонов, справочники, поддержка',
    en: 'Frontend engineer: template builder, reference data, maintenance',
  },
  period: { from: '2024-06', to: '2026-05' },
  teamSize: 3,
  stack: ['react', 'typescript', 'mobx', 'antd', 'scss', 'fsd', 'react-router'],
  highlights: {
    ru: [
      'Иерархическое меню шагов и блоков шаблона: структура сценария видна целиком',
      'Редактор условий перехода между шагами и блоками',
      'Редактор циклов: повторяющиеся блоки в сценарии',
      'Управление ассистентами, пользователями и интеграциями',
      'Общий с клиентским приложением словарь сущностей шаблона',
    ],
    en: [
      'Hierarchical menu of template steps and blocks: the whole scenario structure is visible',
      'Editor for transition conditions between steps and blocks',
      'Loop editor: repeating blocks inside a scenario',
      'Management of assistants, users and integrations',
      'A shared vocabulary of template entities with the client application',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Зачем нужна панель', en: 'Why the panel exists' },
      body: {
        ru: [
          'Шаблоны в помощнике — это не текстовые заготовки, а сценарии с шагами, условиями и циклами. Собирать их в коде означало бы релиз на каждое изменение формулировки.',
          'Панель отдаёт эту работу тем, кто отвечает за содержание: сценарий описывается в интерфейсе и сразу становится доступен пользователям.',
        ],
        en: [
          'Templates in the assistant are not text snippets but scenarios with steps, conditions and loops. Assembling them in code would mean a release for every wording change.',
          'The panel hands that work to the people responsible for the content: a scenario is described in the interface and becomes immediately available to users.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Сценарий помощника собирается в панели и сразу применяется в чате: шаги и переходы видны целиком, без отдельной сборки клиента.',
        ],
        en: [
          'An assistant scenario is assembled in the panel and applies in the chat right away: steps and transitions stay visible as a whole, with no separate client build.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/gpt-admin.png',
      alt: {
        ru: 'Обезличенная админ-панель GPT-помощника под пометкой NDA',
        en: 'Anonymised GPT assistant admin panel marked NDA',
      },
      width: 1600,
      height: 900,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/gpt-admin.png',
        alt: {
          ru: 'Обезличенная админ-панель GPT-помощника под пометкой NDA',
          en: 'Anonymised GPT assistant admin panel marked NDA',
        },
        width: 1600,
        height: 900,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['gpt-admin'],
  related: ['gpt-assistant'],
  keywords: {
    ru: ['админ-панель', 'конструктор сценариев', 'GPT шаблоны', 'MobX'],
    en: ['admin panel', 'scenario builder', 'GPT templates', 'MobX'],
  },
} satisfies TProject;
