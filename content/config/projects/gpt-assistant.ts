import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Проект под NDA. Как добавить медиа — см. content/README.md. */
export const gptAssistantProject = {
  slug: 'gpt-assistant',
  order: 60,
  visibility: 'nda',
  tier: 'flagship',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Чат с GPT-помощником',
    en: 'GPT assistant chat',
  },
  tagline: {
    ru: 'Стриминг ответов, шаблоны со шагами и условиями, ветвление диалога, загрузка файлов',
    en: 'Streamed answers, step-and-condition templates, conversation branching, file uploads',
  },
  summary: {
    ru: 'Ассистент для сотрудников и студентов: свободный чат и режим шаблонов, где запрос собирается по шагам. Отвечает потоком, помнит ветки диалога, принимает файлы и работает под единой авторизацией платформы.',
    en: 'An assistant for staff and students: a free-form chat plus a template mode where the prompt is assembled step by step. It answers as a stream, remembers conversation branches, accepts files and works under the platform’s single sign-on.',
  },
  role: {
    ru: 'Frontend-разработчик: логика шаблонов, стриминг, файлы, SSO',
    en: 'Frontend engineer: template logic, streaming, files, SSO',
  },
  period: { from: '2024-04', to: '2026-07' },
  teamSize: 4,
  stack: [
    'react',
    'typescript',
    'mobx',
    'antd',
    'scss',
    'sse-streaming',
    'oauth-sso',
    'rest-api',
    'fsd',
    'eslint',
  ],
  highlights: {
    ru: [
      'Стриминг ответа модели: чтение потока через ReadableStream и посимвольный рендер без ожидания полного ответа',
      'Шаблоны запросов как сценарий: шаги, блоки, циклы и условия перехода вместо одного большого поля ввода',
      'Интерактивная схема шаблона: пошаговая навигация по сценарию с возвратом к предыдущим шагам',
      'Ветвление истории диалога: регенерация ответа создаёт ветку, а не затирает предыдущий вариант',
      'Загрузка файлов к сообщению и их учёт в контексте запроса',
      'Единая авторизация через SSO с корректной обработкой истёкшего токена посреди стриминга',
      'Рендер markdown с подсветкой кода, экспорт переписки, тёмная и светлая темы',
    ],
    en: [
      'Streamed model answers: reading the stream via ReadableStream and rendering token by token without waiting for the full response',
      'Prompt templates as a scenario: steps, blocks, loops and transition conditions instead of one large input field',
      'Interactive template outline: step-by-step navigation through the scenario with the ability to go back',
      'Conversation branching: regenerating an answer creates a branch instead of overwriting the previous one',
      'File uploads attached to a message and accounted for in the request context',
      'Single sign-on with correct handling of a token that expires mid-stream',
      'Markdown rendering with code highlighting, conversation export, dark and light themes',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Помощник встроен в экосистему платформы: пользователь заходит по единому логину и работает либо в обычном чате, либо в режиме шаблонов — заранее собранных сценариев под типовые задачи.',
          'Шаблон отличается от простого промпта тем, что он ведёт пользователя: задаёт вопросы по шагам, умеет повторять блоки и выбирать следующий шаг по условию.',
        ],
        en: [
          'The assistant is embedded into the platform ecosystem: the user signs in once and works either in a regular chat or in template mode — pre-built scenarios for typical tasks.',
          'A template differs from a plain prompt in that it guides the user: it asks questions step by step, can repeat blocks and choose the next step based on a condition.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Ответ модели приходит долго. Ждать его целиком неприемлемо: без потоковой выдачи интерфейс кажется зависшим, а пользователь не понимает, работает ли запрос.',
          'Шаблоны требуют собственной модели данных: шаги, блоки, циклы и условия перехода нужно и хранить, и показывать так, чтобы пользователь понимал, где он находится в сценарии.',
          'Отдельная тонкость — авторизация. Токен может истечь в момент, когда поток уже открыт, и обработать это нужно без потери набранного контекста.',
        ],
        en: [
          'A model answer takes a long time. Waiting for the whole thing is unacceptable: without streaming the interface looks frozen and the user cannot tell whether the request is working.',
          'Templates require their own data model: steps, blocks, loops and transition conditions must be stored and presented so that the user understands where they are in the scenario.',
          'Authentication is a separate subtlety. The token can expire while the stream is already open, and that must be handled without losing the context the user has entered.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Ответ появляется по мере генерации, шаблоны ведут по шагам, а предыдущие варианты ответа сохраняются. Файлы прикладываются к сообщению, вход общий с платформой.',
        ],
        en: [
          'The answer appears as it is generated, templates walk through the steps, and earlier answer variants are kept. Files attach to a message, and sign-in is shared with the platform.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Помощник стал рабочим инструментом внутри платформы: шаблоны закрывают повторяющиеся задачи, стриминг снял ощущение зависшего интерфейса, а ветвление истории позволяет спокойно экспериментировать с формулировками.',
          'Технически это самый интересный для меня проект из продуктовых: здесь пришлось работать с потоками, а не с привычным «запрос — ответ», и придумывать интерфейс для нелинейной истории диалога.',
        ],
        en: [
          'The assistant became a working tool inside the platform: templates cover recurring tasks, streaming removed the feeling of a frozen interface, and history branching allows calm experimentation with wording.',
          'Technically this is the most interesting product project for me: it required working with streams rather than the usual request-response pattern, and designing an interface for a non-linear conversation history.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'image',
      src: '/media/projects/gpt-chat-bot.png',
      alt: {
        ru: 'Обезличенный чат с GPT-помощником под пометкой NDA',
        en: 'Anonymised GPT assistant chat marked NDA',
      },
      width: 1600,
      height: 994,
      anonymized: true,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/gpt-chat-bot.png',
        alt: {
          ru: 'Обезличенный чат с GPT-помощником под пометкой NDA',
          en: 'Anonymised GPT assistant chat marked NDA',
        },
        width: 1600,
        height: 994,
        anonymized: true,
      },
    ],
  },
  architecture: projectArchitectures['gpt-assistant'],
  related: ['gpt-admin', 'course-player', 'instudy-platform'],
  keywords: {
    ru: [
      'GPT чат',
      'стриминг ответов',
      'ReadableStream',
      'шаблоны промптов',
      'SSO',
    ],
    en: [
      'GPT chat',
      'response streaming',
      'ReadableStream',
      'prompt templates',
      'SSO',
    ],
  },
} satisfies TProject;
