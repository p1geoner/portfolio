import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const navigatorCareerProject = {
  slug: 'navigator-career',
  order: 10,
  visibility: 'public',
  tier: 'flagship',
  category: 'product',
  companyId: 'lazurm',
  name: {
    ru: 'Навигатор карьеры',
    en: 'Career Navigator',
  },
  tagline: {
    ru: 'Агрегатор вакансий региона: миграция с легаси на Next.js с упором на SEO',
    en: 'Regional job aggregator: legacy-to-Next.js migration focused on SEO',
  },
  summary: {
    ru: 'Платформа поиска работы: вакансии, резюме, отклики, чаты и карьерные мероприятия. Перевёл продукт с легаси-SPA на Next.js App Router и выстроил SEO-слой — от серверных метаданных до карты сайта, собираемой из API.',
    en: 'A job search platform with vacancies, resumes, applications, chats and career events. I moved the product from a legacy SPA to the Next.js App Router and built its SEO layer — from server-rendered metadata to a sitemap generated from the API.',
  },
  role: {
    ru: 'Frontend-разработчик: миграция, SEO, новые фичи, поддержка',
    en: 'Frontend engineer: migration, SEO, new features, maintenance',
  },
  period: { from: '2023-06', to: null },
  teamSize: 6,
  stack: [
    'nextjs',
    'app-router',
    'react',
    'typescript',
    'mobx',
    'scss',
    'formik',
    'seo',
    'web-vitals',
    'websocket',
    'leaflet',
    'sentry',
    'storybook',
    'docker',
    'gitlab-ci',
  ],
  highlights: {
    ru: [
      'Миграция с легаси-SPA на Next.js App Router без остановки продуктовой разработки',
      'Серверные метаданные на 15+ динамических разделах: вакансии, компании, соискатели, статьи, курсы, события',
      'Карта сайта собирается из API по идентификаторам сущностей, а не поддерживается руками',
      'Около 70 правил rewrite: человекопонятные URL для пользователя, латиница во внутренних роутах',
      'Чаты на Mattermost с WebSocket-клиентом, отклики и уведомления',
      'Авторизация по SMS и почте, регистрация через VK, единый профиль соискателя и работодателя',
    ],
    en: [
      'Migrated a legacy SPA to the Next.js App Router without pausing product work',
      'Server-side metadata across 15+ dynamic sections: vacancies, companies, applicants, articles, courses, events',
      'The sitemap is generated from API entity identifiers instead of being maintained by hand',
      'Around 70 rewrite rules: human-readable URLs for users, latin routes internally',
      'Mattermost-based chats with a WebSocket client, applications and notifications',
      'SMS and email authentication, VK sign-up, one profile model for applicants and employers',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Продукт', en: 'The product' },
      body: {
        ru: [
          'Региональный агрегатор вакансий: соискатели ведут резюме и откликаются, работодатели публикуют вакансии и разбирают отклики, поверх этого — карьерные мероприятия, статьи, курсы и карта событий.',
          'К моменту моего подключения продукт уже работал, но был написан как классическое SPA: весь контент рисовался на клиенте, метаданные подставлялись через react-helmet, а поисковики видели пустую разметку.',
        ],
        en: [
          'A regional job aggregator: applicants maintain resumes and apply, employers publish vacancies and process applications, and on top of that there are career events, articles, courses and an event map.',
          'By the time I joined the product was already live, but written as a classic SPA: all content rendered on the client, metadata injected through react-helmet, and search engines saw an empty document.',
        ],
      },
    },
    {
      id: 'challenge',
      kind: 'challenge',
      title: { ru: 'Задача', en: 'The problem' },
      body: {
        ru: [
          'Для агрегатора вакансий органический поиск — основной канал: страница каждой вакансии и каждой компании должна попадать в индекс. В легаси-версии этого не происходило вовсе.',
          'Вторая проблема — скорость. Первый экран ждал загрузки бандла и цепочки клиентских запросов, а на слабых устройствах и мобильном интернете это давало заметную задержку.',
          'Третья — поддерживаемость. Логика метаданных лежала в конфигах-объектах рядом с описанием страниц, canonical и noindex расставлялись вручную и легко терялись при доработках.',
        ],
        en: [
          'For a job aggregator organic search is the main channel: every vacancy and every company page has to be indexable. In the legacy version that simply did not happen.',
          'The second problem was speed. The first screen waited for the bundle and a chain of client-side requests, which was clearly noticeable on weaker devices and mobile networks.',
          'The third was maintainability. Metadata logic lived in configuration objects next to page descriptions; canonical and noindex were set by hand and were easy to lose during changes.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'The solution' },
      body: {
        ru: [
          'Перевёл приложение на App Router и сделал серверный рендер ключевых разделов: списки вакансий и резюме, карточки вакансии, компании и соискателя приходят готовой разметкой. Данные для метаданных берутся тем же серверным запросом, что и контент страницы.',
          'Метаданные описал через generateMetadata: заголовок и описание собираются из реальных данных сущности — должность, вилка, город, количество открытых вакансий у работодателя. Для списков в описание подставляется актуальное число предложений, чтобы сниппет в выдаче не был шаблонным.',
          'Карту сайта вынес в sitemap-роут, который запрашивает у API идентификаторы всех публичных сущностей и раскладывает их по разделам. Новая вакансия попадает в карту сайта автоматически, без ручной правки.',
          'Публичные адреса сделал человекопонятными: для пользователя и поисковика это транслитерированные пути вида /vakansii и /soiskatel/:id, внутри приложения — латинские роуты. Соответствие описано правилами rewrite, которых набралось около семидесяти.',
          'Из продуктовых фич сделал чаты на Mattermost с WebSocket-клиентом, отклики, авторизацию по SMS и почте, регистрацию через VK, лендинги карьерных островов для мероприятий и карту событий на Leaflet. Ошибки собираются в Sentry, поведение — в Яндекс.Метрику с вебвизором.',
        ],
        en: [
          'I moved the application to the App Router and server-rendered the key sections: vacancy and resume lists, vacancy, company and applicant pages arrive as ready markup. Metadata is derived from the same server request that fetches the page content.',
          'Metadata is described through generateMetadata: title and description are assembled from real entity data — position, salary range, city, the number of open vacancies at an employer. For list pages the description includes the current number of offers so the search snippet is not boilerplate.',
          'The sitemap became a route that asks the API for the identifiers of all public entities and groups them by section. A new vacancy enters the sitemap automatically, with no manual edits.',
          'Public URLs are human-readable: users and crawlers see transliterated paths such as /vakansii and /soiskatel/:id, while the app uses latin routes internally. The mapping is described by rewrite rules — about seventy of them.',
          'On the product side I built Mattermost-based chats with a WebSocket client, applications, SMS and email authentication, VK sign-up, career-island landing pages for offline events and an event map on Leaflet. Errors go to Sentry, behaviour to Yandex.Metrica with session replay.',
        ],
      },
    },
    {
      id: 'result',
      kind: 'result',
      title: { ru: 'Результат', en: 'The outcome' },
      body: {
        ru: [
          'Страницы вакансий и компаний стали индексируемыми, а карта сайта перестала быть ручной работой. Первый экран приходит с сервера, поэтому основной контент виден до загрузки JavaScript.',
          'Метаданные перестали быть россыпью настроек: они собираются в одном месте из данных сущности, и добавление нового раздела не требует помнить про десяток мелких полей.',
          'Опыт этой миграции я перенёс в текущее портфолио: SEO-слой здесь построен так же, но с единой фабрикой метаданных, из которой невозможно забыть canonical или языковые альтернативы.',
        ],
        en: [
          'Vacancy and company pages became indexable, and the sitemap stopped being manual work. The first screen arrives from the server, so the main content is visible before JavaScript loads.',
          'Metadata stopped being scattered settings: it is assembled in one place from entity data, and adding a new section no longer requires remembering a dozen small fields.',
          'I carried the experience of this migration into this portfolio: the SEO layer here is built the same way, but with a single metadata factory that makes it impossible to forget canonical or language alternates.',
        ],
      },
    },
  ],
  metrics: [],
  media: {
    cover: {
      kind: 'video',
      src: '/media/projects/navigator_preview.mp4',
      poster: '/media/projects/navigator_1.jpg',
      alt: {
        ru: 'Обзор интерфейса Навигатора карьеры',
        en: 'Career Navigator interface walkthrough',
      },
      width: 3358,
      height: 1924,
      anonymized: false,
    },
    gallery: [
      {
        kind: 'image',
        src: '/media/projects/navigator_1.jpg',
        alt: {
          ru: 'Профиль соискателя: карьерная траектория и направление развития',
          en: 'Applicant profile: career path and development direction',
        },
        width: 1280,
        height: 740,
        anonymized: false,
      },
      {
        kind: 'image',
        src: '/media/projects/navigator_2.jpg',
        alt: {
          ru: 'Каталог приоритетных вакансий с поиском и фильтрами',
          en: 'Priority vacancies catalogue with search and filters',
        },
        width: 1280,
        height: 764,
        anonymized: false,
      },
    ],
  },
  // Ссылки на прод и публикации подставляются здесь.
  links: {},
  architecture: projectArchitectures['navigator-career'],
  related: ['navigator-admin', 'sakhalin-housing'],
  keywords: {
    ru: [
      'агрегатор вакансий',
      'Next.js миграция',
      'SEO Next.js',
      'App Router',
      'серверный рендеринг',
    ],
    en: [
      'job aggregator',
      'Next.js migration',
      'Next.js SEO',
      'App Router',
      'server-side rendering',
    ],
  },
} satisfies TProject;
