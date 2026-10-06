import { useTranslations } from 'next-intl';

import { getProfile, getPublicContacts } from '@/entities/profile';
import { CopyContactButton } from '@/features/copy-contact';
import { useAppLocale } from '@/shared/i18n';
import {
  Card,
  ExternalIcon,
  GithubIcon,
  MailIcon,
  PhoneIcon,
  TelegramIcon,
} from '@/shared/ui';

const CHANNEL_ICON = {
  email: MailIcon,
  telegram: TelegramIcon,
  github: GithubIcon,
  phone: PhoneIcon,
} as const;

const buildHref = (channel: string, value: string): string => {
  if (channel === 'email') {
    return `mailto:${value}`;
  }

  if (channel === 'phone') {
    return `tel:${value}`;
  }

  return value;
};

export const ContactBlock = () => {
  const locale = useAppLocale();
  const t = useTranslations('contacts');
  const profile = getProfile();
  const contacts = getPublicContacts();

  return (
    <div className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
      <ul className='flex flex-col gap-3'>
        {contacts.map((contact) => {
          const Icon = CHANNEL_ICON[contact.channel];
          const href = buildHref(contact.channel, contact.value);
          const isExternal = contact.channel !== 'email';

          return (
            <li key={contact.channel}>
              <Card className='flex flex-wrap items-center justify-between gap-4 p-5'>
                <a
                  href={href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer me' : undefined}
                  className='group flex items-center gap-3'
                >
                  <span className='flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--surface-sunken)] text-[var(--text-secondary)] transition-colors duration-200 group-hover:text-[var(--brand)]'>
                    <Icon width={18} height={18} />
                  </span>
                  <span className='flex flex-col'>
                    <span className='text-xs text-[var(--text-muted)]'>
                      {t(`channel.${contact.channel}`)}
                    </span>
                    <span className='inline-flex items-center gap-1.5 text-base font-medium transition-colors duration-200 group-hover:text-[var(--brand)]'>
                      {contact.value.replace(/^https?:\/\//, '')}
                      {isExternal ? (
                        <ExternalIcon width={12} height={12} />
                      ) : null}
                    </span>
                  </span>
                </a>

                {contact.channel === 'email' ? (
                  <CopyContactButton
                    value={contact.value}
                    label={t('channel.email')}
                  />
                ) : null}
              </Card>
            </li>
          );
        })}
      </ul>

      <Card className='flex flex-col gap-5 p-6'>
        <div className='flex flex-col gap-1'>
          <p className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
            {t('locationLabel')}
          </p>
          <p className='text-base'>{profile.location[locale]}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
            {t('languagesLabel')}
          </p>
          <ul className='flex flex-col gap-1'>
            {profile.languages[locale].map((language) => (
              <li key={language} className='text-base'>
                {language}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};
