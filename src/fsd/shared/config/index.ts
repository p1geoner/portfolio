export {
  navigationItemSchema,
  navigationSchema,
  siteConfigSchema,
} from './schema';
export type { TNavigationItem, TSiteConfig } from './schema';
export {
  getFooterNavigation,
  getHeaderNavigation,
  getNavigation,
  getSiteConfig,
} from './registry';
