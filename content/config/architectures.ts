import type { TArchitecture } from '@/shared/content';

/**
 * Фронтенд-архитектуры кейсов. Держим отдельно от текста проекта,
 * чтобы диаграмму можно было править без перечитывания всего кейса.
 */
export const projectArchitectures = {
  'navigator-career': {
    pattern: {
      ru: 'Next.js App Router · Feature-Sliced Design',
      en: 'Next.js App Router · Feature-Sliced Design',
    },
    summary: {
      ru: 'Миграция с SPA на App Router: тонкий app-слой, страницы в pages, доменная логика в FSD, SEO и sitemap как отдельные server-only модули.',
      en: 'SPA → App Router migration: thin app layer, FSD pages, domain logic in slices, SEO and sitemap as server-only modules.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app / routing', en: 'app / routing' },
        items: {
          ru: [
            '[locale] layouts',
            '~70 rewrite-правил',
            'metadata / OG',
            'sitemap из API',
          ],
          en: [
            '[locale] layouts',
            '~70 rewrite rules',
            'metadata / OG',
            'API-driven sitemap',
          ],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Вакансии', 'Компании', 'Резюме', 'События', 'Статьи'],
          en: ['Vacancies', 'Companies', 'Resumes', 'Events', 'Articles'],
        },
      },
      {
        id: 'widgets',
        label: { ru: 'widgets', en: 'widgets' },
        items: {
          ru: ['Шапка / фильтры', 'Карта Leaflet', 'Чаты Mattermost'],
          en: ['Header / filters', 'Leaflet map', 'Mattermost chats'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Отклики', 'Auth SMS/VK', 'Уведомления', 'Поиск'],
          en: ['Applications', 'SMS/VK auth', 'Notifications', 'Search'],
        },
      },
      {
        id: 'entities-shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Vacancy / Company', 'MobX stores', 'API-клиент', 'UI-kit'],
          en: ['Vacancy / Company', 'MobX stores', 'API client', 'UI kit'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
        label: { ru: 'SSR / metadata', en: 'SSR / metadata' },
      },
      {
        from: 'pages',
        to: 'widgets',
        label: { ru: 'compose', en: 'compose' },
      },
      {
        from: 'pages',
        to: 'features',
        label: { ru: 'actions', en: 'actions' },
      },
      {
        from: 'widgets',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities-shared',
        label: { ru: 'domain', en: 'domain' },
      },
      {
        from: 'widgets',
        to: 'entities-shared',
      },
    ],
  },
  'sakhalin-housing': {
    pattern: {
      ru: 'Next.js App Router · Feature-Sliced Design',
      en: 'Next.js App Router · Feature-Sliced Design',
    },
    summary: {
      ru: 'Агрегатор недвижимости: серверный рендер карточек объектов, SEO-слой и карта предложений в том же FSD-контуре, что и Навигатор.',
      en: 'Real-estate aggregator: SSR listing cards, SEO layer and map inside the same FSD contour as Career Navigator.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app / routing', en: 'app / routing' },
        items: {
          ru: ['App Router', 'Серверные metadata', 'Canonical / noindex'],
          en: ['App Router', 'Server metadata', 'Canonical / noindex'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Каталог', 'Карточка объекта', 'Ипотека', 'Контент'],
          en: ['Catalog', 'Listing page', 'Mortgage', 'Content'],
        },
      },
      {
        id: 'widgets',
        label: { ru: 'widgets', en: 'widgets' },
        items: {
          ru: ['Фильтры каталога', 'Карта объектов', 'Галерея'],
          en: ['Catalog filters', 'Listings map', 'Gallery'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Подбор / избранное', 'Заявки', 'Калькуляторы'],
          en: ['Shortlist', 'Lead forms', 'Calculators'],
        },
      },
      {
        id: 'entities-shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Listing / Agency', 'MobX', 'SEO helpers', 'UI'],
          en: ['Listing / Agency', 'MobX', 'SEO helpers', 'UI'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
        label: { ru: 'SSR', en: 'SSR' },
      },
      {
        from: 'pages',
        to: 'widgets',
        label: { ru: 'UI shell', en: 'UI shell' },
      },
      {
        from: 'pages',
        to: 'features',
        label: { ru: 'leads', en: 'leads' },
      },
      {
        from: 'widgets',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities-shared',
        label: { ru: 'domain', en: 'domain' },
      },
      {
        from: 'widgets',
        to: 'entities-shared',
      },
    ],
  },
  'course-constructor': {
    pattern: {
      ru: 'React · Feature-Sliced Design · shared lib',
      en: 'React · Feature-Sliced Design · shared lib',
    },
    summary: {
      ru: 'Конструктор курсов под NDA: сложные редакторы вынесены в features, переиспользуемые блоки — в shared-библиотеку экосистемы InStudy.',
      en: 'NDA course builder: complex editors live in features; reusable blocks ship in the InStudy shared library.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'shell', en: 'shell' },
        items: {
          ru: ['SPA shell', 'Роутинг разделов', 'Права доступа'],
          en: ['SPA shell', 'Section routing', 'Access control'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Редактор курса', 'Структура модулей', 'Превью'],
          en: ['Course editor', 'Module tree', 'Preview'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['DnD блоков', 'Валидация схемы', 'Публикация'],
          en: ['Block DnD', 'Schema validation', 'Publish flow'],
        },
      },
      {
        id: 'entities',
        label: { ru: 'entities', en: 'entities' },
        items: {
          ru: ['Course / Module / Block', 'Версии контента'],
          en: ['Course / Module / Block', 'Content versions'],
        },
      },
      {
        id: 'shared-lib',
        label: { ru: 'shared · instudy-lib', en: 'shared · instudy-lib' },
        items: {
          ru: ['Редакторы', 'UI-примитивы', 'Типы контента'],
          en: ['Editors', 'UI primitives', 'Content types'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
        label: { ru: 'routes', en: 'routes' },
      },
      {
        from: 'pages',
        to: 'features',
        label: { ru: 'editors', en: 'editors' },
      },
      {
        from: 'features',
        to: 'entities',
        label: { ru: 'schema', en: 'schema' },
      },
      {
        from: 'features',
        to: 'shared-lib',
        label: { ru: 'reuse', en: 'reuse' },
      },
      {
        from: 'entities',
        to: 'shared-lib',
      },
    ],
  },
  'longread-library': {
    pattern: {
      ru: 'Library package · headless blocks',
      en: 'Library package · headless blocks',
    },
    summary: {
      ru: 'Переиспользуемая библиотека лонгридов: пакет без привязки к продукту, потребители подключают блоки и темы.',
      en: 'Reusable longread library: product-agnostic package; consumers plug in blocks and themes.',
    },
    layers: [
      {
        id: 'public-api',
        label: { ru: 'public API', en: 'public API' },
        items: {
          ru: ['Экспорт блоков', 'Тема / токены', 'Типы props'],
          en: ['Block exports', 'Theme / tokens', 'Prop types'],
        },
      },
      {
        id: 'blocks',
        label: { ru: 'content blocks', en: 'content blocks' },
        items: {
          ru: ['Текст / медиа', 'Интерактив', 'Навигация по главам'],
          en: ['Text / media', 'Interactive', 'Chapter nav'],
        },
      },
      {
        id: 'runtime',
        label: { ru: 'runtime', en: 'runtime' },
        items: {
          ru: ['Рендер схемы', 'Адаптеры данных', 'a11y-хуки'],
          en: ['Schema render', 'Data adapters', 'a11y hooks'],
        },
      },
      {
        id: 'tooling',
        label: { ru: 'tooling', en: 'tooling' },
        items: {
          ru: ['Storybook', 'Сборка пакета', 'Версионирование'],
          en: ['Storybook', 'Package build', 'Versioning'],
        },
      },
    ],
    edges: [
      {
        from: 'public-api',
        to: 'blocks',
        label: { ru: 'exports', en: 'exports' },
      },
      {
        from: 'blocks',
        to: 'runtime',
        label: { ru: 'render', en: 'render' },
      },
      {
        from: 'runtime',
        to: 'tooling',
        label: { ru: 'ship', en: 'ship' },
      },
      {
        from: 'public-api',
        to: 'tooling',
        label: { ru: 'version', en: 'version' },
      },
    ],
  },
  'instudy-platform': {
    pattern: {
      ru: 'Next.js · Feature-Sliced Design',
      en: 'Next.js · Feature-Sliced Design',
    },
    summary: {
      ru: 'Образовательная платформа 2.0: витрина и кабинет ученика на App Router, доменные слайсы под курсы, прогресс и оплату.',
      en: 'EdTech platform 2.0: learner surface on App Router with course, progress and payment slices.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app / routing', en: 'app / routing' },
        items: {
          ru: ['App Router', 'Кабинет / витрина', 'i18n'],
          en: ['App Router', 'Cabinet / storefront', 'i18n'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Каталог курсов', 'Урок', 'Профиль', 'Оплата'],
          en: ['Course catalog', 'Lesson', 'Profile', 'Checkout'],
        },
      },
      {
        id: 'widgets',
        label: { ru: 'widgets', en: 'widgets' },
        items: {
          ru: ['Навигация обучения', 'Прогресс', 'Рекомендации'],
          en: ['Learning nav', 'Progress', 'Recommendations'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Запись на курс', 'Домашки', 'Сертификаты'],
          en: ['Enrollment', 'Assignments', 'Certificates'],
        },
      },
      {
        id: 'entities-shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Course / Lesson', 'User progress', 'API / UI'],
          en: ['Course / Lesson', 'User progress', 'API / UI'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
        label: { ru: 'App Router', en: 'App Router' },
      },
      {
        from: 'pages',
        to: 'widgets',
        label: { ru: 'compose', en: 'compose' },
      },
      {
        from: 'pages',
        to: 'features',
        label: { ru: 'flows', en: 'flows' },
      },
      {
        from: 'widgets',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities-shared',
        label: { ru: 'domain', en: 'domain' },
      },
      {
        from: 'widgets',
        to: 'entities-shared',
      },
    ],
  },
  'gpt-assistant': {
    pattern: {
      ru: 'Next.js · streaming chat architecture',
      en: 'Next.js · streaming chat architecture',
    },
    summary: {
      ru: 'GPT-чат: отдельный feature потока ответов, история в entities, админские настройки через соседний продукт.',
      en: 'GPT chat: dedicated streaming feature, history in entities, admin settings via a sibling product.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app', en: 'app' },
        items: {
          ru: ['Chat route', 'Auth gate', 'Server actions / API'],
          en: ['Chat route', 'Auth gate', 'Server actions / API'],
        },
      },
      {
        id: 'widgets',
        label: { ru: 'widgets', en: 'widgets' },
        items: {
          ru: ['Окно чата', 'Сайдбар истории', 'Composer'],
          en: ['Chat window', 'History sidebar', 'Composer'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['SSE / stream', 'Промпт-шаблоны', 'Файлы в контексте'],
          en: ['SSE / stream', 'Prompt templates', 'File context'],
        },
      },
      {
        id: 'entities',
        label: { ru: 'entities', en: 'entities' },
        items: {
          ru: ['Thread / Message', 'Assistant config'],
          en: ['Thread / Message', 'Assistant config'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['Markdown render', 'Токены UI', 'Ошибки сети'],
          en: ['Markdown render', 'UI tokens', 'Network errors'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'widgets',
        label: { ru: 'shell', en: 'shell' },
      },
      {
        from: 'widgets',
        to: 'features',
        label: { ru: 'stream', en: 'stream' },
      },
      {
        from: 'features',
        to: 'entities',
        label: { ru: 'history', en: 'history' },
      },
      {
        from: 'features',
        to: 'shared',
      },
      {
        from: 'widgets',
        to: 'shared',
        label: { ru: 'UI', en: 'UI' },
      },
    ],
  },
  'instudy-marketplace': {
    pattern: {
      ru: 'Next.js · Feature-Sliced Design',
      en: 'Next.js · Feature-Sliced Design',
    },
    summary: {
      ru: 'Маркетплейс курсов: каталог, карточка и чекаут как отдельные pages/features, платежный контур изолирован.',
      en: 'Course marketplace: catalog, PDP and checkout as separate pages/features; payments isolated.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app / routing', en: 'app / routing' },
        items: {
          ru: ['Витрина', 'Кабинет продавца', 'SEO listing'],
          en: ['Storefront', 'Seller cabinet', 'SEO listings'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Каталог', 'Карточка', 'Корзина / оплата'],
          en: ['Catalog', 'PDP', 'Cart / checkout'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Фильтры / поиск', 'Корзина', 'Оформление заказа'],
          en: ['Filters / search', 'Cart', 'Checkout'],
        },
      },
      {
        id: 'entities-shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Product / Offer', 'Order', 'UI / API'],
          en: ['Product / Offer', 'Order', 'UI / API'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities-shared',
      },
    ],
  },
  'course-player': {
    pattern: {
      ru: 'React player shell · feature modules',
      en: 'React player shell · feature modules',
    },
    summary: {
      ru: 'Плеер курсов: оболочка воспроизведения, трек прогресса и интерактивы как независимые features.',
      en: 'Course player: playback shell with progress tracking and interactives as independent features.',
    },
    layers: [
      {
        id: 'shell',
        label: { ru: 'player shell', en: 'player shell' },
        items: {
          ru: ['Layout урока', 'Контролы', 'Адаптив'],
          en: ['Lesson layout', 'Controls', 'Responsive'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Видео / HLS', 'Тесты', 'Заметки', 'Прогресс'],
          en: ['Video / HLS', 'Quizzes', 'Notes', 'Progress'],
        },
      },
      {
        id: 'entities',
        label: { ru: 'entities', en: 'entities' },
        items: {
          ru: ['Lesson / Asset', 'Progress state'],
          en: ['Lesson / Asset', 'Progress state'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['Медиа-утилиты', 'UI controls', 'Analytics events'],
          en: ['Media utils', 'UI controls', 'Analytics events'],
        },
      },
    ],
    edges: [
      {
        from: 'shell',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities',
      },
      {
        from: 'entities',
        to: 'shared',
      },
    ],
  },
  'gpt-admin': {
    pattern: {
      ru: 'Admin panel · feature modules',
      en: 'Admin panel · feature modules',
    },
    summary: {
      ru: 'Админка ассистента: CRUD промптов и моделей, таблицы и формы в features, общий admin shell.',
      en: 'Assistant admin: prompt/model CRUD, tables and forms in features, shared admin shell.',
    },
    layers: [
      {
        id: 'shell',
        label: { ru: 'admin shell', en: 'admin shell' },
        items: {
          ru: ['Layout', 'Навигация разделов', 'RBAC'],
          en: ['Layout', 'Section nav', 'RBAC'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Промпты', 'Модели', 'Логи диалогов'],
          en: ['Prompts', 'Models', 'Dialog logs'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['CRUD форм', 'Фильтры таблиц', 'Публикация конфига'],
          en: ['Form CRUD', 'Table filters', 'Config publish'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['Table kit', 'Form kit', 'API client'],
          en: ['Table kit', 'Form kit', 'API client'],
        },
      },
    ],
    edges: [
      {
        from: 'shell',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'shared',
      },
    ],
  },
  'admission-university': {
    pattern: {
      ru: 'Next.js · multi-step forms · FSD',
      en: 'Next.js · multi-step forms · FSD',
    },
    summary: {
      ru: 'Заявления в вуз: пошаговые формы как features, валидация и черновики в entities, серверный submit.',
      en: 'University applications: multi-step forms as features, drafts/validation in entities, server submit.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app', en: 'app' },
        items: {
          ru: ['App Router', 'Защита шагов', 'Server actions'],
          en: ['App Router', 'Step guards', 'Server actions'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Мастер заявления', 'Статус подачи', 'Документы'],
          en: ['Application wizard', 'Status', 'Documents'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Шаги формы', 'Загрузка файлов', 'Подпись / согласие'],
          en: ['Form steps', 'File upload', 'Consent'],
        },
      },
      {
        id: 'entities-shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Application draft', 'Validators', 'UI forms'],
          en: ['Application draft', 'Validators', 'UI forms'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'entities-shared',
      },
    ],
  },
  'admission-college': {
    pattern: {
      ru: 'Next.js · multi-step forms · FSD',
      en: 'Next.js · multi-step forms · FSD',
    },
    summary: {
      ru: 'Заявления в колледж: тот же каркас форм, что у вуза, с отдельными сценариями и справочниками.',
      en: 'College applications: same form architecture as university, with distinct flows and dictionaries.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app', en: 'app' },
        items: {
          ru: ['App Router', 'Шаги сценария', 'Server submit'],
          en: ['App Router', 'Flow steps', 'Server submit'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Мастер', 'Справочники', 'Статус'],
          en: ['Wizard', 'Dictionaries', 'Status'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Динамические поля', 'Валидация', 'Черновик'],
          en: ['Dynamic fields', 'Validation', 'Draft'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'entities · shared', en: 'entities · shared' },
        items: {
          ru: ['Form schema', 'Upload', 'UI kit'],
          en: ['Form schema', 'Upload', 'UI kit'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'shared',
      },
    ],
  },
  'navigator-admin': {
    pattern: {
      ru: 'Admin SPA · feature modules',
      en: 'Admin SPA · feature modules',
    },
    summary: {
      ru: 'Админка Навигатора: таблицы сущностей и модерация в features, общий shell с ролями.',
      en: 'Navigator admin: entity tables and moderation in features, shared role-aware shell.',
    },
    layers: [
      {
        id: 'shell',
        label: { ru: 'admin shell', en: 'admin shell' },
        items: {
          ru: ['Layout', 'RBAC меню', 'Аудит действий'],
          en: ['Layout', 'RBAC menu', 'Action audit'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Вакансии', 'Компании', 'Пользователи', 'Контент'],
          en: ['Vacancies', 'Companies', 'Users', 'Content'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Модерация', 'Массовые операции', 'Импорт'],
          en: ['Moderation', 'Bulk actions', 'Import'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['Data tables', 'Filters', 'API'],
          en: ['Data tables', 'Filters', 'API'],
        },
      },
    ],
    edges: [
      {
        from: 'shell',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'shared',
      },
    ],
  },
  'housing-admin': {
    pattern: {
      ru: 'Admin SPA · feature modules',
      en: 'Admin SPA · feature modules',
    },
    summary: {
      ru: 'Админка недвижимости: карточки объектов, модерация объявлений и справочники в изолированных features.',
      en: 'Housing admin: listing cards, moderation and dictionaries in isolated features.',
    },
    layers: [
      {
        id: 'shell',
        label: { ru: 'admin shell', en: 'admin shell' },
        items: {
          ru: ['Layout', 'Роли', 'Навигация'],
          en: ['Layout', 'Roles', 'Navigation'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Объекты', 'Агентства', 'Заявки'],
          en: ['Listings', 'Agencies', 'Leads'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Модерация', 'Медиа-загрузка', 'Справочники'],
          en: ['Moderation', 'Media upload', 'Dictionaries'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['Forms', 'Tables', 'API client'],
          en: ['Forms', 'Tables', 'API client'],
        },
      },
    ],
    edges: [
      {
        from: 'shell',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'features',
      },
      {
        from: 'features',
        to: 'shared',
      },
    ],
  },
  'parsing-cars': {
    pattern: {
      ru: 'Full-stack pet · Next.js + parsers',
      en: 'Full-stack pet · Next.js + parsers',
    },
    summary: {
      ru: 'Личный проект: Next.js-фронт каталога, парсеры и API на своём сервере, простой feature-first каркас.',
      en: 'Side project: Next.js catalog UI, parsers and API on my server, simple feature-first layout.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app', en: 'app' },
        items: {
          ru: ['Next.js routes', 'SSR каталога', 'Деплой'],
          en: ['Next.js routes', 'Catalog SSR', 'Deploy'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Поиск / фильтры', 'Карточка авто', 'Сравнение'],
          en: ['Search / filters', 'Car card', 'Compare'],
        },
      },
      {
        id: 'api',
        label: { ru: 'API · parsers', en: 'API · parsers' },
        items: {
          ru: ['Сбор объявлений', 'Нормализация', 'Кэш'],
          en: ['Listing crawl', 'Normalize', 'Cache'],
        },
      },
      {
        id: 'infra',
        label: { ru: 'infra', en: 'infra' },
        items: {
          ru: ['VPS', 'Cron jobs', 'Nginx'],
          en: ['VPS', 'Cron jobs', 'Nginx'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'features',
      },
      {
        from: 'features',
        to: 'api',
      },
      {
        from: 'api',
        to: 'infra',
      },
    ],
  },
  domdoctor: {
    pattern: {
      ru: 'Next.js · locale routes + MobX',
      en: 'Next.js · locale routes + MobX',
    },
    summary: {
      ru: 'Фриланс: App Router с `[lang]`, каталог и заявки для B2C/B2B, MobX-стор и Formik-формы поверх REST API.',
      en: 'Freelance: App Router with `[lang]`, B2C/B2B catalogue and applications, MobX store and Formik forms over a REST API.',
    },
    layers: [
      {
        id: 'app',
        label: { ru: 'app / [lang]', en: 'app / [lang]' },
        items: {
          ru: ['Locale routing', 'Layouts', 'SSR страниц'],
          en: ['Locale routing', 'Layouts', 'Page SSR'],
        },
      },
      {
        id: 'pages',
        label: { ru: 'pages', en: 'pages' },
        items: {
          ru: ['Каталог услуг', 'Заявка клиента', 'Формы для бизнеса'],
          en: ['Service catalogue', 'Client application', 'Business forms'],
        },
      },
      {
        id: 'ui',
        label: { ru: 'UI · forms', en: 'UI · forms' },
        items: {
          ru: ['UI-kit', 'Formik-формы', 'Загрузка файлов'],
          en: ['UI kit', 'Formik forms', 'File upload'],
        },
      },
      {
        id: 'data',
        label: { ru: 'data', en: 'data' },
        items: {
          ru: ['MobX store', 'REST API', 'Локали городов СНГ'],
          en: ['MobX store', 'REST API', 'CIS city locales'],
        },
      },
    ],
    edges: [
      {
        from: 'app',
        to: 'pages',
      },
      {
        from: 'pages',
        to: 'ui',
      },
      {
        from: 'ui',
        to: 'data',
      },
    ],
  },
  'stoloto-games': {
    pattern: {
      ru: 'Hackathon · Electron + React',
      en: 'Hackathon · Electron + React',
    },
    summary: {
      ru: 'Хакатон Столото: Electron-shell, React UI мини-игр, быстрый feature-first без тяжёлого FSD.',
      en: 'Stoloto hackathon: Electron shell, React mini-game UI, fast feature-first without heavy FSD.',
    },
    layers: [
      {
        id: 'electron',
        label: { ru: 'Electron shell', en: 'Electron shell' },
        items: {
          ru: ['Main process', 'Preload bridge', 'Window lifecycle'],
          en: ['Main process', 'Preload bridge', 'Window lifecycle'],
        },
      },
      {
        id: 'renderer',
        label: { ru: 'renderer · React', en: 'renderer · React' },
        items: {
          ru: ['Игровые экраны', 'UI-kit хакатона', 'Анимации'],
          en: ['Game screens', 'Hackathon UI kit', 'Motion'],
        },
      },
      {
        id: 'features',
        label: { ru: 'features', en: 'features' },
        items: {
          ru: ['Мини-игры', 'Сcoring', 'Онбординг'],
          en: ['Mini-games', 'Scoring', 'Onboarding'],
        },
      },
      {
        id: 'shared',
        label: { ru: 'shared', en: 'shared' },
        items: {
          ru: ['IPC types', 'Assets', 'Utils'],
          en: ['IPC types', 'Assets', 'Utils'],
        },
      },
    ],
    edges: [
      {
        from: 'electron',
        to: 'renderer',
      },
      {
        from: 'renderer',
        to: 'features',
      },
      {
        from: 'features',
        to: 'shared',
      },
    ],
  },
} as const satisfies Record<string, TArchitecture>;
