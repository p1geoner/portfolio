import type { TExperienceEntry } from '@/entities/experience';

/**
 * Опыт и образование в одном списке: kind разделяет их на таймлайне.
 * projectSlugs связывают место работы с карточками проектов.
 */
export const experienceConfig = [
  {
    id: 'lazurm',
    kind: 'work',
    organization: { ru: 'LazurM', en: 'LazurM' },
    position: {
      ru: 'Frontend-разработчик',
      en: 'Frontend Engineer',
    },
    location: { ru: 'Удалённо', en: 'Remote' },
    period: { from: '2023-02', to: null },
    summary: {
      ru: 'Продуктовая разработка в одной команде: основная нагрузка — EdTech-экосистема (конструктор, плеер, лонгриды, платформа, AI), плюс агрегаторы вакансий и недвижимости. Три года в компании, рост с Junior до Middle.',
      en: 'Product development in one team: primary focus on the EdTech ecosystem (builder, player, longreads, platform, AI), plus job and real estate aggregators. Three years in the company, growth from Junior to Middle.',
    },
    responsibilities: {
      ru: [
        'Разработка нового функционала с нуля и развитие существующих продуктов на Next.js, React и легаси-коде',
        'Развитие EdTech-экосистемы: конструктор курсов, плеер, библиотека лонгридов, платформа обучения, маркетплейс',
        'Миграции с легаси на Next.js с упором на SEO, скорость и качество логики',
        'Поддержка всех проектов команды: багфиксы, рефакторинг, доработки по требованиям, релизы в прод',
        'Оптимизация производительности фронтенда для обучающихся и авторов, оптимизация запросов к ИИ',
        'Смоук-тестирование, исправление дефектов, горячие фиксы в проде',
        'Настройка и сопровождение CI/CD в рамках ответственности на проектах',
        'Код-ревью на всех проектах команды, онбординг и обучение стажёров',
        'Взаимодействие с backend, дизайном и менеджментом: уточнение требований, оценка сроков, приоритизация',
      ],
      en: [
        'Building new features from scratch and evolving existing products on Next.js, React and legacy code',
        'Growing the EdTech ecosystem: course builder, player, longread library, learning platform, marketplace',
        'Migrating legacy applications to Next.js with a focus on SEO, speed and logic quality',
        'Maintaining all team projects: bug fixes, refactoring, requirement-driven changes, production releases',
        'Optimising learner/author frontend performance and AI request flows',
        'Smoke testing, defect fixing, hotfixes in production',
        'Setting up and maintaining CI/CD within project ownership',
        'Code review across all team projects, onboarding and mentoring interns',
        'Working with backend, design and management: clarifying requirements, estimating, prioritising',
      ],
    },
    achievements: {
      ru: [
        'Повышение грейда с Junior до Middle при непрерывной работе в одной команде на протяжении трёх лет',
        'Долгая работа над EdTech-экосистемой: расширение библиотеки лонгридов, текстовый и контентный редакторы, модернизация редактора контента',
        'Оптимизация фронтенда для обучающихся и авторов; оптимизация запросов к ИИ и внедрение SSE-стриминга в ассистенте',
        'Разработан и внедрён модуль уведомлений, переиспользуемый на проектах команды',
        'Регулярные рефакторинги и релизы в прод по конструктору курсов, плееру, платформе и смежным продуктам',
        'Запущен и поддерживается агрегатор недвижимости с нуля на Next.js: геоданные, коммуникации, отклики',
        'Выполнена миграция агрегатора вакансий с легаси на Next.js с упором на SEO, скорость и качество логики',
        'Вклад в инфраструктуру разработки и культуру качества: ревью, тестирование, процессы в команде',
      ],
      en: [
        'Promoted from Junior to Middle while working continuously in the same team for three years',
        'Long-term work on the EdTech ecosystem: extending the longread library, text and content editors, modernising the content editor',
        'Optimised learner/author frontend; optimised AI requests and shipped SSE streaming in the assistant',
        'Built and rolled out a notifications module reused across team projects',
        'Ongoing refactors and production releases for the course builder, player, platform and related products',
        'Launched and maintained a real estate aggregator built from scratch on Next.js: geo data, communications, applications',
        'Delivered the migration of a job aggregator from legacy to Next.js focused on SEO, speed and logic quality',
        'Contributed to development infrastructure and quality culture: review, testing, team processes',
      ],
    },
    grades: [
      {
        id: 'junior',
        title: { ru: 'Junior Frontend', en: 'Junior Frontend' },
        period: { from: '2023-02', to: '2024-08' },
      },
      {
        id: 'middle',
        title: { ru: 'Middle Frontend', en: 'Middle Frontend' },
        period: { from: '2024-09', to: null },
      },
    ],
    projectSlugs: [
      'navigator-career',
      'sakhalin-housing',
      'course-constructor',
      'longread-library',
      'instudy-platform',
      'gpt-assistant',
      'gpt-admin',
      'instudy-marketplace',
      'course-player',
      'admission-university',
      'admission-college',
      'navigator-admin',
      'housing-admin',
    ],
  },
  {
    id: 'freelance',
    kind: 'work',
    organization: { ru: 'Фриланс', en: 'Freelance' },
    position: {
      ru: 'Frontend-разработчик',
      en: 'Frontend Engineer',
    },
    location: { ru: 'Удалённо', en: 'Remote' },
    period: { from: '2024-02', to: null },
    summary: {
      ru: 'Заказная разработка продуктовых веб-сервисов: от структуры и локализации до форм заказа и сценариев для клиентов и бизнеса. Пример — платформа медицинских услуг для стран СНГ.',
      en: 'Custom product web services: from structure and localisation to order flows and scenarios for clients and businesses. Example — a medical services platform for CIS countries.',
    },
    responsibilities: {
      ru: [
        'Сбор требований с заказчиком и оценка объёма работ',
        'Разработка клиентской части на Next.js и React с локализацией под рынки СНГ',
        'Реализация сценариев для B2C и B2B: каталог услуг, заявки, формы для сотрудников',
        'Интеграция с API, состояние интерфейса и валидация форм',
      ],
      en: [
        'Gathering requirements with the client and estimating scope',
        'Building the client side on Next.js and React with localisation for CIS markets',
        'Implementing B2C and B2B flows: service catalogue, applications, employee forms',
        'API integration, UI state and form validation',
      ],
    },
    achievements: {
      ru: [
        'Запущена платформа медицинских услуг DomDoctor с локализацией для стран СНГ',
        'Закрыты оба контура продукта: услуги для частных клиентов и сценарии для бизнеса',
      ],
      en: [
        'Shipped the DomDoctor medical services platform with localisation for CIS countries',
        'Covered both product sides: services for private clients and flows for businesses',
      ],
    },
    grades: [],
    projectSlugs: ['domdoctor'],
  },
  {
    id: 'hackathons',
    kind: 'work',
    organization: { ru: 'Хакатоны', en: 'Hackathons' },
    position: {
      ru: 'Участник и призёр',
      en: 'Participant and prize-winner',
    },
    location: { ru: 'Россия', en: 'Russia' },
    period: { from: '2023-01', to: null },
    summary: {
      ru: 'Три региональных хакатона по продуктовому программированию и участие во всероссийском: быстрый MVP, командная работа и защита решения перед жюри.',
      en: 'Three regional product-programming hackathons and an all-Russian one: fast MVPs, teamwork and pitching the solution to a jury.',
    },
    responsibilities: {
      ru: [
        'Сборка MVP за ограниченное время: от идеи и архитектуры до демо',
        'Frontend и связка с backend/сокет-слоем в команде',
        'Презентация продукта и технических решений жюри',
      ],
      en: [
        'Shipping an MVP under a hard deadline: from idea and architecture to demo',
        'Frontend and integration with the backend/socket layer as a team',
        'Presenting the product and technical decisions to the jury',
      ],
    },
    achievements: {
      ru: [
        'Победитель одного из трёх региональных хакатонов по продуктовому программированию',
        '2-е и 3-е места на двух других региональных хакатонах',
        'Участник всероссийского хакатона',
      ],
      en: [
        'Winner of one of three regional product-programming hackathons',
        '2nd and 3rd places at the other two regional hackathons',
        'Participant in an all-Russian hackathon',
      ],
    },
    grades: [],
    projectSlugs: ['stoloto-games'],
  },
  {
    id: 'kosygin-university',
    kind: 'education',
    organization: {
      ru: 'РГУ им. А. Н. Косыгина (Технологии. Дизайн. Искусство)',
      en: 'Kosygin Russian State University (Technology. Design. Art)',
    },
    position: {
      ru: 'Информационные технологии в дизайне',
      en: 'Information Technology in Design',
    },
    location: { ru: 'Москва', en: 'Moscow' },
    period: { from: '2024-09', to: '2028-06' },
    summary: {
      ru: 'Факультет гуманитарных наук и дизайна, направление «Информационные технологии в дизайне». Учусь параллельно с работой.',
      en: 'Faculty of Humanities and Design, Information Technology in Design programme. Studying alongside full-time work.',
    },
    responsibilities: { ru: [], en: [] },
    achievements: { ru: [], en: [] },
    grades: [],
    projectSlugs: [],
  },
  {
    id: 'konyaev-college',
    kind: 'education',
    organization: {
      ru: 'Тверской колледж им. А. Н. Коняева',
      en: 'Konyaev Tver College',
    },
    position: { ru: 'Программист', en: 'Software Developer' },
    location: { ru: 'Тверь', en: 'Tver' },
    period: { from: '2020-09', to: '2024-06' },
    summary: {
      ru: 'IT-колледж, специальность «Программист». Первую работу в разработке начал на третьем курсе.',
      en: 'IT college, Software Developer programme. Started my first development job in the third year.',
    },
    responsibilities: { ru: [], en: [] },
    achievements: { ru: [], en: [] },
    grades: [],
    projectSlugs: [],
  },
] satisfies TExperienceEntry[];
