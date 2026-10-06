import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { getProjectSlugs } from '@/entities/project';
import {
  ProjectDetailPage,
  buildProjectMetadata,
} from '@/pages/project-detail';
import type { TLocale } from '@/shared/content';
import { routing } from '@/shared/i18n';

type PageProps = {
  params: Promise<{ locale: TLocale; slug: string }>;
};

/** Все кейсы во всех локалях собираются статически на этапе сборки. */
export const generateStaticParams = (): Array<{
  locale: string;
  slug: string;
}> =>
  routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug }))
  );

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { locale, slug } = await params;

  return buildProjectMetadata(locale, slug);
};

const Page = async ({ params }: PageProps) => {
  const { locale, slug } = await params;

  setRequestLocale(locale);

  return <ProjectDetailPage locale={locale} slug={slug} />;
};

export default Page;
