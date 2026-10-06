import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ProjectsPage, buildProjectsMetadata } from '@/pages/projects';
import type { TLocale } from '@/shared/content';

type PageProps = {
  params: Promise<{ locale: TLocale }>;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale } = await params;

  return buildProjectsMetadata(locale);
};

const Page = async ({ params }: PageProps) => {
  const { locale } = await params;

  setRequestLocale(locale);

  return <ProjectsPage locale={locale} />;
};

export default Page;
