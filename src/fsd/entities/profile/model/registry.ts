import { profileConfig } from '@content/config/profile.config';

import { parseConfig } from '@/shared/content';

import { type TContact, type TProfile, profileSchema } from './schema';

const profile: TProfile = parseConfig(
  profileSchema,
  profileConfig,
  'content/config/profile.config'
);

export const getProfile = (): TProfile => profile;

export const getPublicContacts = (): readonly TContact[] =>
  profile.contacts.filter((contact) => contact.visible);

export const getPreferredContacts = (): readonly TContact[] =>
  profile.contacts.filter((contact) => contact.visible && contact.preferred);
