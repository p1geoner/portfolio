import { getTranslations } from 'next-intl/server';

import { getEducation, getWorkExperience } from '@/entities/experience';
import { getProjectNames } from '@/entities/project';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { formatDuration, getTotalMonths } from '@/shared/datetime';
import { JsonLd, buildAbsoluteUrl, buildBreadcrumbSchema } from '@/shared/seo';
import { Badge, Container, SectionHeading } from '@/shared/ui';
import { ExperienceTimeline } from '@/widgets/experience-timeline';

type IExperiencePageProps = {
  locale: TLocale;
};

export const ExperiencePage = async ({ locale }: IExperiencePageProps) => {
  const t = await getTranslations({ locale, namespace: 'experience' });
  const site = getSiteConfig();
  const work = getWorkExperience();
  const education = getEducation();
  const projectNames = getProjectNames(locale);

  const totalExperience = formatDuration(
    getTotalMonths(work.map((entry) => entry.period)),
    t
  );

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: site.name[locale], url: buildAbsoluteUrl(locale, '/') },
          { name: t('title'), url: buildAbsoluteUrl(locale, '/experience') },
        ])}
      />

      <Container className='py-12 md:py-16'>
        <SectionHeading
          level='h1'
          title={t('title')}
          description={t('subtitle')}
          action={
            <Badge tone='brand'>
              {t('totalLabel')}: {totalExperience}
            </Badge>
          }
        />

        <div className='flex flex-col gap-14'>
          <section className='flex flex-col gap-6'>
            <h2 className='font-mono text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase'>
              {t('workTitle')}
            </h2>
            <ExperienceTimeline entries={work} projectNames={projectNames} />
          </section>

          <section className='flex flex-col gap-6'>
            <h2 className='font-mono text-xs tracking-[0.16em] text-[var(--text-muted)] uppercase'>
              {t('educationTitle')}
            </h2>
            <ExperienceTimeline
              entries={education}
              projectNames={projectNames}
            />
          </section>
        </div>
      </Container>
    </>
  );
};
