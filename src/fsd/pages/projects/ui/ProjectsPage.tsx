import { getTranslations } from 'next-intl/server';

import { getProjects } from '@/entities/project';
import { getSkillLabels } from '@/entities/skill';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import {
  JsonLd,
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildItemListSchema,
} from '@/shared/seo';
import { Container, SectionHeading } from '@/shared/ui';
import { ArchitectureDiagram } from '@/widgets/architecture-diagram';

import { ProjectsCatalog } from './ProjectsCatalog';

type ProjectsPageProps = {
  locale: TLocale;
};

export const ProjectsPage = async ({ locale }: ProjectsPageProps) => {
  const t = await getTranslations({ locale, namespace: 'projects' });
  const nav = await getTranslations({ locale, namespace: 'nav' });
  const site = getSiteConfig();
  const projects = getProjects();
  const skillLabels = getSkillLabels();

  const stackLabelsByProject = Object.fromEntries(
    projects.map((project) => [
      project.slug,
      Object.fromEntries(
        project.stack.map((skillId) => [
          skillId,
          skillLabels[skillId] ?? skillId,
        ])
      ),
    ])
  );

  const architecturePreviews = site.features.projectArchitecture
    ? Object.fromEntries(
        projects.map((project) => [
          project.slug,
          <ArchitectureDiagram
            key={project.slug}
            architecture={project.architecture}
            compact
          />,
        ])
      )
    : {};

  const itemList = projects.map((project) => ({
    name: project.name[locale],
    url: buildAbsoluteUrl(locale, `/projects/${project.slug}`),
  }));

  return (
    <>
      <JsonLd data={buildItemListSchema(itemList)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: nav('ariaLabel'), url: buildAbsoluteUrl(locale, '/') },
          { name: t('title'), url: buildAbsoluteUrl(locale, '/projects') },
        ])}
      />

      <Container className='py-12 md:py-16'>
        <SectionHeading
          level='h1'
          title={t('title')}
          description={t('subtitle')}
          className='mb-8 md:mb-10'
        />

        <ProjectsCatalog
          projects={projects}
          stackLabels={skillLabels}
          stackLabelsByProject={stackLabelsByProject}
          architecturePreviews={architecturePreviews}
        />
      </Container>
    </>
  );
};
