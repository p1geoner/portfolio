import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/** Локале-осведомлённые Link и хелперы навигации. */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
