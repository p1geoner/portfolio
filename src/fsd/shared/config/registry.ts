import { navigationConfig } from '@content/config/navigation.config';
import { siteConfig } from '@content/config/site.config';

import { parseConfig } from '../content';
import {
  type TNavigationItem,
  type TSiteConfig,
  navigationSchema,
  siteConfigSchema,
} from './schema';

const site: TSiteConfig = parseConfig(
  siteConfigSchema,
  siteConfig,
  'content/config/site.config'
);

const navigation: readonly TNavigationItem[] = parseConfig(
  navigationSchema,
  navigationConfig,
  'content/config/navigation.config'
);

export const getSiteConfig = (): TSiteConfig => site;

export const getNavigation = (): readonly TNavigationItem[] => navigation;

export const getHeaderNavigation = (): readonly TNavigationItem[] =>
  navigation.filter((item) => item.showInHeader);

export const getFooterNavigation = (): readonly TNavigationItem[] =>
  navigation.filter((item) => item.showInFooter);
