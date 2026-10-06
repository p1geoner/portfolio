import type { TNavigationItem } from '@/shared/config';

/** Пункты меню. Порядок в массиве определяет порядок в шапке и подвале. */
export const navigationConfig = [
  {
    id: 'home',
    href: '/',
    label: { ru: 'Главная', en: 'Home' },
    showInHeader: false,
    showInFooter: true,
  },
  {
    id: 'projects',
    href: '/projects',
    label: { ru: 'Проекты', en: 'Projects' },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: 'experience',
    href: '/experience',
    label: { ru: 'Опыт', en: 'Experience' },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: 'stack',
    href: '/stack',
    label: { ru: 'Стек', en: 'Stack' },
    showInHeader: true,
    showInFooter: true,
  },
  {
    id: 'contacts',
    href: '/contacts',
    label: { ru: 'Контакты', en: 'Contacts' },
    showInHeader: true,
    showInFooter: true,
  },
] satisfies TNavigationItem[];
