# Контент портфолио

Весь текст, все ссылки и все медиафайлы описаны в конфигах этой папки.
Код приложения не содержит контента: чтобы поменять сайт, достаточно править файлы здесь.

## Где что лежит

| Файл                                   | Что настраивает                                               |
| -------------------------------------- | ------------------------------------------------------------- |
| `config/site.config.ts`                | Домен, язык по умолчанию, коды поисковиков, включение функций |
| `config/profile.config.ts`             | Имя, роль, тексты о себе, портрет, факты, контакты            |
| `config/navigation.config.ts`          | Пункты меню в шапке и подвале                                 |
| `config/companies.config.ts`           | Компании и организации, к которым привязаны проекты           |
| `config/skills.config.ts`              | Стек: навыки, уровни, граф связей между технологиями          |
| `config/experience.config.ts`          | Опыт работы, грейды, образование                              |
| `config/projects/*.ts`                 | Кейсы: по одному файлу на проект                              |
| `config/architectures.ts`              | Слоёные схемы фронтенда по slug проекта                       |
| `messages/ru.json`, `messages/en.json` | Подписи интерфейса (кнопки, заголовки блоков)                 |

Каждый конфиг проверяется схемой Zod при сборке. Если поле заполнено неверно,
сборка падает с понятной ошибкой и указанием пути до поля — сломанный контент
не попадёт в прод.

## Как добавить проект

1. Скопировать любой файл из `config/projects/` и переименовать.
2. Заполнить поля, задать уникальный `slug` (kebab-case) и `order`.
3. Добавить экспорт в массив `projectsConfig` в `config/projects/index.ts`.
4. Проверить: `npm run content:validate`.

## Как добавить картинки, гифки и видео

Файлы кладутся в `public/media/projects/<slug>/`, в конфиге указывается путь от корня сайта.

```ts
media: {
  cover: {
    kind: 'image',
    src: '/media/projects/navigator-career/cover.jpg',
    alt: { ru: 'Главная страница агрегатора', en: 'Aggregator home page' },
    width: 1920,
    height: 1080,
    anonymized: false
  },
  gallery: [
    {
      kind: 'image',
      src: '/media/projects/navigator-career/search.jpg',
      alt: { ru: 'Поиск вакансий', en: 'Vacancy search' },
      caption: { ru: 'Фильтры и выдача', en: 'Filters and results' },
      width: 1920,
      height: 1080,
      anonymized: false
    },
    {
      kind: 'gif',
      src: '/media/projects/navigator-career/filters.gif',
      poster: '/media/projects/navigator-career/filters-poster.jpg',
      alt: { ru: 'Работа фильтров', en: 'Filters in action' },
      width: 1280,
      height: 720,
      anonymized: false
    },
    {
      kind: 'video',
      src: '/media/projects/navigator-career/demo.mp4',
      poster: '/media/projects/navigator-career/demo-poster.jpg',
      alt: { ru: 'Демонстрация отклика', en: 'Application demo' },
      width: 1920,
      height: 1080,
      anonymized: false
    }
  ]
}
```

Правила:

- `width` и `height` — реальные размеры файла. Они нужны, чтобы страница
  не дёргалась при загрузке изображения (нулевой CLS).
- `kind: 'gif'` подходит для коротких зацикленных демо. Для записи длиннее
  пары секунд лучше `kind: 'video'` с файлом `mp4`: он весит в разы меньше.
- `poster` для гифок и видео показывается до загрузки тяжёлого файла.
- `anonymized` отмечает, что кадр обезличен. **Для проектов под NDA
  (`visibility: 'nda'`) поле обязано быть `true`** — иначе валидация не пройдёт.
- Внешние ссылки на картинки запрещены схемой: путь должен начинаться с `/`
  и указывать на файл внутри `public`.
- Пока медиа нет, оставляйте `cover: null` и `gallery: []` — интерфейс
  показывает аккуратную заглушку, а не битую картинку.

## Как добавить ссылки на прод

Только для проектов с `visibility: 'public'`:

```ts
links: {
  production: 'https://example.ru',
  repository: 'https://github.com/p1geoner/example',
  publication: 'https://habr.com/ru/articles/000000/'
}
```

У проектов под NDA поля `links` нет в схеме вообще: добавить ссылку не получится
ни случайно, ни намеренно — TypeScript и валидация не дадут.

## Как заменить портрет

Положить файл в `public/media/profile/portrait.jpg` и обновить `width`/`height`
в `config/profile.config.ts`.
