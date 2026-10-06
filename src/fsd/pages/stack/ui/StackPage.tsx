import { getTranslations } from 'next-intl/server';

import { getSkills } from '@/entities/skill';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { JsonLd, buildAbsoluteUrl, buildBreadcrumbSchema } from '@/shared/seo';
import { Container, Reveal, SectionHeading } from '@/shared/ui';
import { SkillGroups } from '@/widgets/skill-graph';

type IStackPageProps = {
  locale: TLocale;
};

export const StackPage = async ({ locale }: IStackPageProps) => {
  const t = await getTranslations({ locale, namespace: 'stack' });
  const site = getSiteConfig();
  const skills = getSkills();

  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: site.name[locale], url: buildAbsoluteUrl(locale, '/') },
          { name: t('title'), url: buildAbsoluteUrl(locale, '/stack') },
        ])}
      />

      <Container className='py-12 md:py-16'>
        <Reveal variant='blur'>
          <SectionHeading
            level='h1'
            title={t('title')}
            description={t('subtitle')}
          />
        </Reveal>

        <Reveal delay={0.1}>
          <SkillGroups skills={skills} />
        </Reveal>
      </Container>
    </>
  );
};
