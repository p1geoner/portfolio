import { useTranslations } from 'next-intl';

import { getPublicContacts, getProfile } from '@/entities/profile';
import { getFooterNavigation, getSiteConfig } from '@/shared/config';
import { Link, useAppLocale } from '@/shared/i18n';
import { Container, ExternalIcon } from '@/shared/ui';

const CONTACT_HREF: Record<string, (value: string) => string> = {
  email: (value) => `mailto:${value}`,
  telegram: (value) => value,
  github: (value) => value,
  phone: (value) => `tel:${value}`,
};

export const SiteFooter = () => {
  const locale = useAppLocale();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const site = getSiteConfig();
  const profile = getProfile();
  const contacts = getPublicContacts();
  const navigation = getFooterNavigation();
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-[var(--border-subtle)] py-12'>
      <Container className='flex flex-col gap-10'>
        <div className='flex flex-col gap-8 md:flex-row md:justify-between'>
          <div className='max-w-sm'>
            <p className='font-mono text-sm tracking-[0.16em] uppercase'>
              {profile.name[locale]}
            </p>
            <p className='mt-3 text-sm leading-relaxed text-[var(--text-secondary)]'>
              {profile.role[locale]} · {profile.location[locale]}
            </p>
          </div>

          <nav
            aria-label={nav('footerLabel')}
            className='flex flex-col gap-2 text-sm'
          >
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className='text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--brand)]'
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          <ul className='flex flex-col gap-2 text-sm'>
            {contacts.map((contact) => {
              const buildHref = CONTACT_HREF[contact.channel];

              return (
                <li key={contact.channel}>
                  <a
                    href={buildHref ? buildHref(contact.value) : contact.value}
                    target={contact.channel === 'email' ? undefined : '_blank'}
                    rel={
                      contact.channel === 'email'
                        ? undefined
                        : 'noopener noreferrer me'
                    }
                    className='inline-flex items-center gap-1.5 text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--brand)]'
                  >
                    {contact.label[locale]}
                    {contact.channel === 'email' ? null : (
                      <ExternalIcon width={12} height={12} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className='flex flex-col gap-2 border-t border-[var(--border-subtle)] pt-6 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {year} {site.name[locale]}. {t('rights')}.
          </p>
          <p>{t('builtWith')}</p>
        </div>
      </Container>
    </footer>
  );
};
