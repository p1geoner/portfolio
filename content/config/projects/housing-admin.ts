import { projectArchitectures } from '../architectures';
import type { TProject } from '@/entities/project';

/** Как добавить скриншоты, гифки и видео — см. content/README.md. */
export const housingAdminProject = {
  slug: 'housing-admin',
  order: 130,
  visibility: 'public',
  tier: 'support',
  category: 'admin',
  companyId: 'lazurm',
  name: {
    ru: 'Админ-панель агрегатора недвижимости',
    en: 'Real estate aggregator admin panel',
  },
  tagline: {
    ru: 'Модерация объявлений, управление объектами агентства и ипотечными программами',
    en: 'Listing moderation, management of agency properties and mortgage programmes',
  },
  summary: {
    ru: 'Панель для сотрудников агентства: проверка объявлений, объекты и брони, ипотечные программы, новости и справочники. Поддержка, доработки и рефакторинг.',
    en: 'A panel for agency staff: listing review, properties and bookings, mortgage programmes, news and reference data. Maintenance, changes and refactoring.',
  },
  role: {
    ru: 'Frontend-разработчик: доработки, багфиксы, рефакторинг',
    en: 'Frontend engineer: changes, bug fixes, refactoring',
  },
  period: { from: '2023-05', to: '2025-03' },
  teamSize: 3,
  stack: ['react', 'typescript', 'mobx', 'formik', 'scss', 'react-router'],
  highlights: {
    ru: [
      'Модерация пользовательских объявлений со статусами и причинами отказа',
      'Управление объектами агентства и заявками на бронирование',
      'Настройка ипотечных программ и их условий',
      'Редактор новостей и фотоотчётов',
      'Общие с публичным порталом типы данных: изменение схемы не расходится между приложениями',
    ],
    en: [
      'Moderation of user listings with statuses and rejection reasons',
      'Management of agency properties and booking requests',
      'Configuration of mortgage programmes and their terms',
      'News and photo report authoring',
      'Data types shared with the public portal: a schema change does not drift between applications',
    ],
  },
  sections: [
    {
      id: 'context',
      kind: 'context',
      title: { ru: 'Роль в продукте', en: 'Role in the product' },
      body: {
        ru: [
          'Публичный портал показывает только то, что прошло проверку, поэтому панель — обязательная половина продукта: без неё объявления не попадают в выдачу, а брони не обрабатываются.',
          'Работа состояла из доработок по требованиям сотрудников агентства, исправления дефектов и приведения похожих разделов к общему виду.',
        ],
        en: [
          'The public portal only shows what passed review, so the panel is a mandatory half of the product: without it listings never reach the catalogue and bookings are not processed.',
          'The work consisted of changes requested by agency staff, defect fixes and bringing similar sections to a common shape.',
        ],
      },
    },
  ],
  metrics: [
    {
      id: 'pair',
      value: { ru: '2 приложения', en: '2 applications' },
      label: {
        ru: 'портал и панель на общих типах',
        en: 'portal and panel on shared types',
      },
      estimated: false,
    },
  ],
  media: { cover: null, gallery: [] },
  links: {},
  architecture: projectArchitectures['housing-admin'],
  related: ['sakhalin-housing', 'navigator-admin'],
  keywords: {
    ru: ['админ-панель', 'модерация объявлений', 'MobX', 'недвижимость'],
    en: ['admin panel', 'listing moderation', 'MobX', 'real estate'],
  },
} satisfies TProject;
