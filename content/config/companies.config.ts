import type { TCompany } from '@/entities/company';

export const companiesConfig = [
  {
    id: 'lazurm',
    name: { ru: 'LazurM', en: 'LazurM' },
    description: {
      ru: 'Продуктовая разработка и сопровождение веб-платформ: агрегаторы, образовательные сервисы, AI-инструменты.',
      en: 'Product development and maintenance of web platforms: aggregators, learning services, AI tools.',
    },
    url: null,
  },
  {
    id: 'personal',
    name: { ru: 'Личные проекты', en: 'Personal projects' },
    description: {
      ru: 'Пет-проекты и инфраструктура, где я отвечаю за все слои — от парсеров до деплоя.',
      en: 'Pet projects and infrastructure where I own every layer, from parsers to deployment.',
    },
    url: null,
  },
  {
    id: 'hackathons',
    name: { ru: 'Хакатоны', en: 'Hackathons' },
    description: {
      ru: 'Командные соревнования с жёсткими сроками: MVP от идеи до демо за считанные дни.',
      en: 'Team competitions with hard deadlines: MVP from idea to demo in a matter of days.',
    },
    url: null,
  },
  {
    id: 'freelance',
    name: { ru: 'Фриланс', en: 'Freelance' },
    description: {
      ru: 'Заказная продуктовая разработка: от брифа до релиза для клиентов и бизнеса.',
      en: 'Custom product development: from brief to release for clients and businesses.',
    },
    url: null,
  },
] satisfies TCompany[];
