export {
  CONTACT_CHANNELS,
  contactChannelSchema,
  contactSchema,
  profileSchema,
} from './model/schema';
export type {
  TContact,
  TContactChannel,
  TProfile,
  TProfileFact,
} from './model/schema';
export {
  getPreferredContacts,
  getProfile,
  getPublicContacts,
} from './model/registry';
