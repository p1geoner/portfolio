import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ContactsPage, buildContactsMetadata } from '@/pages/contacts';
import type { TLocale } from '@/shared/content';

type PageProps = {
  params: Promise<{ locale: TLocale }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;

  return buildContactsMetadata(locale);
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ContactsPage locale={locale} />;
};

export default Page;
