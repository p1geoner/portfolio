import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const domDoctorProject = {
  slug: 'domdoctor',
  order: 130,
  visibility: 'public',
  tier: 'major',
  category: 'product',
  companyId: 'freelance',
  name: {
    ru: 'DomDoctor',
    en: 'DomDoctor',
  },
  tagline: {
    ru: 'Платформа медицинских услуг для стран СНГ: локализация, B2C и B2B',
    en: 'Medical services platform for CIS countries: localisation, B2C and B2B',
  },
  summary: {
    ru: 'Фриланс-проект: веб-платформа для заказа медицинских услуг в странах СНГ. Локализация под регионы, каталог услуг, заявки для частных клиентов и отдельные сценарии для бизнеса.',
    en: 'A freelance project: a web platform for ordering medical services across CIS countries. Region-based localisation, a service catalogue, applications for private clients and separate flows for businesses.',
  },
  role: {
    ru: 'Frontend-разработчик: продукт, локализация, формы и интеграции',
    en: 'Frontend engineer: product UI, localisation, forms and integrations',
  },
  period: { from: '2024-02', to: '2024-04' },
  stack: [
    'nextjs',
    'react',
    'typescript',
    'mobx',
    'formik',
    'scss',
    'rest-api',
  ],
  highlights: {
    ru: [
      'Локализация под города и рынки СНГ через App Router `[lang]`',
      'Два контура продукта: услуги для клиентов и сценарии для бизнеса',
      'Каталог услуг, заявки, формы заказа и загрузка файлов',
      'Состояние на MobX, валидация форм на Formik',
      'Интеграция с API и аналитика посещений',
    ],
    en: [
      'Localisation for CIS cities and markets via the App Router `[lang]` segment',
      'Two product sides: services for clients and flows for businesses',
      'Service catalogue, applications, order forms and file uploads',
      'MobX for state, Formik for form validation',
      'API integration and visit analytics',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Контекст', en: 'Context' },
      body: {
        ru: [
          'Заказчику нужна была платформа, через которую частные клиенты и бизнес в странах СНГ могут заказывать медицинские услуги — с учётом локали региона, а не одной «общей» версии сайта.',
          'Сроки фриланса короче продуктовой команды: важно было быстро собрать понятный клиентский путь и не размазать логику между страницами.',
        ],
        en: [
          'The client needed a platform where private customers and businesses in CIS countries could order medical services — with region-aware localisation, not a single generic site.',
          'Freelance timelines are shorter than a product team’s: the goal was to ship a clear customer journey quickly without spreading logic across pages.',
        ],
      },
    },
    {
      id: 'solution',
      kind: 'solution',
      title: { ru: 'Решение', en: 'Solution' },
      body: {
        ru: [
          'Собрал фронтенд на Next.js с сегментом локали в маршрутах: контент и данные подстраиваются под выбранный город/рынок СНГ.',
          'Клиентский контур закрывает каталог, заявку и формы заказа; для бизнеса — отдельные страницы и формы сотрудников. Состояние интерфейса держится в MobX, сложные формы — на Formik с загрузкой файлов.',
        ],
        en: [
          'I built the frontend on Next.js with a locale segment in the routes: content and data adapt to the selected CIS city/market.',
          'The client side covers the catalogue, applications and order forms; businesses get separate pages and employee forms. UI state lives in MobX, complex forms use Formik with file uploads.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'markets',
      value: { ru: 'СНГ', en: 'CIS' },
      label: {
        ru: 'локализация под регионы и города',
        en: 'localisation for regions and cities',
      },
      estimated: false,
    },
    {
      id: 'audiences',
      value: { ru: 'B2C + B2B', en: 'B2C + B2B' },
      label: {
        ru: 'услуги клиентам и бизнесу',
        en: 'services for clients and businesses',
      },
      estimated: false,
    },
  ],
  media: { cover: null, gallery: [] },
  links: {
    repository: 'https://github.com/p1geoner/in-doctor',
  },
  architecture: projectArchitectures.domdoctor,
  related: ['sakhalin-housing', 'stoloto-games'],
  keywords: {
    ru: [
      'медицина',
      'фриланс',
      'локализация',
      'СНГ',
      'Next.js',
      'MobX',
      'B2B',
      'B2C',
      'DomDoctor',
    ],
    en: [
      'healthcare',
      'freelance',
      'localisation',
      'CIS',
      'Next.js',
      'MobX',
      'B2B',
      'B2C',
      'DomDoctor',
    ],
  },
} satisfies TProject;
