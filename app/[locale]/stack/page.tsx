import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { StackPage, buildStackMetadata } from '@/pages/stack';
import type { TLocale } from '@/shared/content';

type PageProps = {
  params: Promise<{ locale: TLocale }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;

  return buildStackMetadata(locale);
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <StackPage locale={locale} />;
};

export default Page;
