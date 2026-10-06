import type { TProfile } from '@/entities/profile';

/**
 * Личный блок: тексты о себе, портрет, факты и контакты.
 * Портрет лежит в public/media/profile — заменить файл достаточно там,
 * не забыв обновить width/height под новые размеры изображения.
 */
export const profileConfig = {
  name: {
    ru: 'Дмитрий Николаев',
    en: 'Dmitrii Nikolaev',
  },
  shortName: {
    ru: 'Дмитрий',
    en: 'Dmitrii',
  },
  role: {
    ru: 'Frontend-разработчик · Next.js / React',
    en: 'Frontend Engineer · Next.js / React',
  },
  headline: {
    ru: 'Строю фронтенд, на который можно опереться в проде',
    en: 'I build frontend that holds up in production',
  },
  tagline: {
    ru: 'Три года в продукте — вырос с Junior до Middle. Делаю фронтенд для EdTech, агрегаторов и AI: аккуратно по архитектуре и так, чтобы в проде держался.',
    en: 'Three years in product — grew from Junior to Middle. I build frontend for EdTech, aggregators, and AI: solid architecture that holds up in production.',
  },
  bio: {
    ru: [
      'С февраля 2023 работаю фронтендером в продуктовой команде и вырос с Junior до Middle. Большую часть времени закрываю EdTech — конструктор курсов, плеер, лонгриды, платформу обучения, маркетплейс и GPT-ассистент — плюс агрегаторы вакансий и недвижимости, админки и фриланс.',
      'В EdTech расширял библиотеку лонгридов, делал редакторы, оптимизировал фронт для обучающихся, работал с ИИ и SSE, выкатывал общий модуль уведомлений и доводил релизы до прода.',
      'Люблю разгребать легаси и размытые требования до понятной архитектуры: миграции на Next.js, SEO и Core Web Vitals, общие библиотеки, Feature-Sliced Design. В команде веду ревью, онбординг стажёров и смоук перед релизом. Параллельно — фриланс и хакатоны: брал 1-е, 2-е и 3-е места на региональных и всероссийском.',
    ],
    en: [
      'Since February 2023 I’ve been a frontend engineer in a product team and grew from Junior to Middle. Most of my time goes into EdTech — course builder, player, longreads, learning platform, marketplace, and a GPT assistant — plus job/real-estate aggregators, admin tools, and freelance work.',
      'In EdTech I’ve extended the longread library, built editors, optimised the learner frontend, worked with AI and SSE, shipped a shared notifications module, and owned production releases.',
      'I like turning messy legacy and fuzzy requirements into clear architecture: Next.js migrations, SEO and Core Web Vitals, shared libraries, Feature-Sliced Design. On the team I own review, intern onboarding, and release smoke checks. Separately — freelance and hackathons: 1st, 2nd, and 3rd places at regionals and an all-Russian one.',
    ],
  },
  location: {
    ru: 'Тверь, Россия',
    en: 'Tver, Russia',
  },
  birthDate: '2004-09-13',
  photo: {
    kind: 'image',
    src: '/media/profile/portrait.jpg',
    alt: {
      ru: 'Портрет Дмитрия Николаева',
      en: 'Portrait of Dmitrii Nikolaev',
    },
    width: 3239,
    height: 4858,
    anonymized: false,
  },
  facts: [
    {
      id: 'years',
      value: { ru: '3+ года', en: '3+ years' },
      label: { ru: 'в продуктовой разработке', en: 'in product development' },
    },
    {
      id: 'grade-growth',
      value: { ru: 'Junior → Middle', en: 'Junior → Middle' },
      label: { ru: 'рост в одной команде', en: 'growth within one team' },
    },
    {
      id: 'projects',
      value: { ru: '16 кейсов', en: '16 cases' },
      label: {
        ru: 'агрегаторы · EdTech · AI · freelance',
        en: 'aggregators · EdTech · AI · freelance',
      },
    },
    {
      id: 'hackathons',
      value: { ru: '1-е · 2-е · 3-е', en: '1st · 2nd · 3rd' },
      label: {
        ru: 'места на хакатонах — от региона до всероссийского',
        en: 'hackathon places — regional to all-Russian',
      },
    },
  ],
  contacts: [
    {
      channel: 'email',
      value: 'pegeoner@mail.ru',
      label: { ru: 'Почта', en: 'Email' },
      visible: true,
      preferred: true,
    },
    {
      channel: 'telegram',
      value: 'https://t.me/t1men0',
      label: { ru: 'Telegram', en: 'Telegram' },
      visible: true,
      preferred: true,
    },
    {
      channel: 'github',
      value: 'https://github.com/p1geoner',
      label: { ru: 'GitHub', en: 'GitHub' },
      visible: true,
      preferred: false,
    },
    {
      // Телефон намеренно скрыт: публиковать его в открытом HTML нет смысла,
      // связаться можно через Telegram или почту.
      channel: 'phone',
      value: '+79301551642',
      label: { ru: 'Телефон', en: 'Phone' },
      visible: false,
      preferred: false,
    },
  ],
  languages: {
    ru: ['Русский — родной', 'Английский — технический'],
    en: ['Russian — native', 'English — technical reading'],
  },
  seoKeywords: {
    ru: [
      'frontend-разработчик',
      'Next.js разработчик',
      'React разработчик',
      'TypeScript',
      'Дмитрий Николаев',
      'портфолио фронтенд',
      'SEO оптимизация Next.js',
    ],
    en: [
      'frontend developer',
      'Next.js developer',
      'React developer',
      'TypeScript engineer',
      'Dmitrii Nikolaev',
      'frontend portfolio',
    ],
  },
} satisfies TProfile;
