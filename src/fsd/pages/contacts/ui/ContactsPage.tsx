import { getTranslations } from 'next-intl/server';

import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { JsonLd, buildAbsoluteUrl, buildBreadcrumbSchema } from '@/shared/seo';
import { Container, SectionHeading } from '@/shared/ui';
import { ContactBlock } from '@/widgets/contact-block';

type ContactsPageProps = {
  locale: TLocale;
};

export const ContactsPage = async ({ locale }: ContactsPageProps) => {
  const t = await getTranslations({ locale, namespace: 'contacts' });
  const site = getSiteConfig();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: site.name[locale], url: buildAbsoluteUrl(locale, '/') },
          { name: t('title'), url: buildAbsoluteUrl(locale, '/contacts') },
        ])}
      />

      <Container className='py-12 md:py-16'>
        <SectionHeading
          level='h1'
          title={t('title')}
          description={t('subtitle')}
        />
        <ContactBlock />
      </Container>
    </>
  );
};
