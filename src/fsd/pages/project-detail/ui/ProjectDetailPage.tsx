import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getCompanyById } from '@/entities/company';
import { getProfile } from '@/entities/profile';
import {
  ProjectCard,
  ProjectMetrics,
  getProjectBySlug,
  getProjectLinks,
  getProjects,
} from '@/entities/project';
import { getSkillLabels } from '@/entities/skill';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import { formatPeriod } from '@/shared/datetime';
import { Link } from '@/shared/i18n';
import {
  JsonLd,
  buildAbsoluteUrl,
  buildBreadcrumbSchema,
  buildCreativeWorkSchema,
} from '@/shared/seo';
import {
  ArrowLeftIcon,
  Badge,
  BulletList,
  Card,
  Container,
  ExternalButtonLink,
  ExternalIcon,
  LockIcon,
  MediaFrame,
  MediaPlaceholder,
  Prose,
  Reveal,
} from '@/shared/ui';
import { ArchitectureDiagram } from '@/widgets/architecture-diagram';

import { getRelatedProjects } from '../lib/getRelatedProjects';

type IProjectDetailPageProps = {
  locale: TLocale;
  slug: string;
};

export const ProjectDetailPage = async ({
  locale,
  slug,
}: IProjectDetailPageProps) => {
  const project = getProjectBySlug(slug);

  if (project === null) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'project' });
  const projectsT = await getTranslations({ locale, namespace: 'projects' });
  const common = await getTranslations({ locale, namespace: 'common' });

  const site = getSiteConfig();
  const profile = getProfile();
  const skillLabels = getSkillLabels();
  const company = getCompanyById(project.companyId);
  const links = getProjectLinks(project);
  const related = getRelatedProjects(project, getProjects());

  const projectUrl = buildAbsoluteUrl(locale, `/projects/${project.slug}`);

  const metaItems = [
    { id: 'role', label: t('roleLabel'), value: project.role[locale] },
    {
      id: 'period',
      label: t('periodLabel'),
      value: formatPeriod(project.period, locale, common('present')),
    },
    ...(project.teamSize === undefined
      ? []
      : [
          {
            id: 'team',
            label: t('teamLabel'),
            value: t('teamValue', { count: project.teamSize }),
          },
        ]),
    ...(company === null
      ? []
      : [
          {
            id: 'company',
            label: t('companyLabel'),
            value: company.name[locale],
          },
        ]),
  ];

  return (
    <>
      <JsonLd
        data={buildCreativeWorkSchema({
          name: project.name[locale],
          description: project.summary[locale],
          url: projectUrl,
          authorName: profile.name[locale],
          keywords: project.keywords[locale],
          technologies: project.stack.map(
            (skillId) => skillLabels[skillId] ?? skillId
          ),
          dateCreated: `${project.period.from}-01`,
          imageUrl:
            project.media.cover === null
              ? undefined
              : `${site.url}${project.media.cover.src}`,
          publisherName: company?.name[locale],
        })}
      />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: site.name[locale], url: buildAbsoluteUrl(locale, '/') },
          {
            name: projectsT('title'),
            url: buildAbsoluteUrl(locale, '/projects'),
          },
          { name: project.name[locale], url: projectUrl },
        ])}
      />

      <Container className='py-10 md:py-14'>
        <Link
          href='/projects'
          className='inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--brand)]'
        >
          <ArrowLeftIcon />
          {t('backToProjects')}
        </Link>

        <header className='mt-8 flex flex-col gap-6'>
          <div className='flex flex-wrap items-center gap-2'>
            <Badge tone={project.tier === 'flagship' ? 'brand' : 'neutral'}>
              {projectsT(`tier.${project.tier}`)}
            </Badge>
            <Badge tone='outline'>
              {projectsT(`category.${project.category}`)}
            </Badge>
            {project.visibility === 'nda' ? (
              <Badge tone='support' title={projectsT('ndaHint')}>
                <LockIcon width={12} height={12} />
                {projectsT('ndaBadge')}
              </Badge>
            ) : null}
          </div>

          <div className='flex flex-col gap-4'>
            <h1 className='text-balance-tight text-3xl leading-[1.1] md:text-5xl'>
              {project.name[locale]}
            </h1>
            <p className='max-w-3xl text-lg leading-relaxed text-[var(--text-secondary)]'>
              {project.tagline[locale]}
            </p>
          </div>

          <dl className='grid grid-cols-1 gap-x-8 gap-y-4 border-y border-[var(--border-subtle)] py-6 sm:grid-cols-2 lg:grid-cols-4'>
            {metaItems.map((item) => (
              <div key={item.id} className='flex flex-col gap-1'>
                <dt className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                  {item.label}
                </dt>
                <dd className='text-sm text-[var(--text-primary)]'>
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          {project.visibility === 'nda' ? (
            <p className='max-w-3xl rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] p-4 text-sm leading-relaxed text-[var(--text-muted)]'>
              {projectsT('ndaHint')}
            </p>
          ) : null}

          {links !== null &&
          Object.values(links).some((value) => value !== undefined) ? (
            <div className='flex flex-wrap gap-3'>
              {links.production === undefined ? null : (
                <ExternalButtonLink href={links.production} size='sm'>
                  {t('linkProduction')}
                  <ExternalIcon width={14} height={14} />
                </ExternalButtonLink>
              )}
              {links.repository === undefined ? null : (
                <ExternalButtonLink href={links.repository} size='sm'>
                  {t('linkRepository')}
                  <ExternalIcon width={14} height={14} />
                </ExternalButtonLink>
              )}
              {links.publication === undefined ? null : (
                <ExternalButtonLink href={links.publication} size='sm'>
                  {t('linkPublication')}
                  <ExternalIcon width={14} height={14} />
                </ExternalButtonLink>
              )}
            </div>
          ) : null}
        </header>

        <div className='mt-10'>
          {project.media.cover === null ? (
            <MediaPlaceholder
              seed={project.slug}
              label={projectsT('mediaPlaceholder')}
            />
          ) : (
            <MediaFrame
              asset={project.media.cover}
              locale={locale}
              priority
              autoPlay={project.media.cover.kind === 'video'}
              sizes='(min-width: 1024px) 76rem, 100vw'
              className='aspect-[16/9]'
            />
          )}
        </div>

        <div className='mt-12 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16'>
          <div className='flex flex-col gap-12'>
            <Prose paragraphs={[project.summary[locale]]} size='lg' />

            {project.highlights[locale].length > 0 ? (
              <section className='flex flex-col gap-4'>
                <h2 className='text-2xl'>{t('highlightsTitle')}</h2>
                <BulletList items={project.highlights[locale]} />
              </section>
            ) : null}

            {project.sections.map((section, index) => (
              <Reveal
                as='section'
                key={section.id}
                delay={index * 0.04}
                className='flex flex-col gap-4'
              >
                <p className='font-mono text-xs tracking-[0.16em] text-[var(--brand)] uppercase'>
                  {t(`sectionKind.${section.kind}`)}
                </p>
                <h2 className='text-2xl'>{section.title[locale]}</h2>
                <Prose paragraphs={section.body[locale]} />
              </Reveal>
            ))}

            {site.features.projectArchitecture ? (
              <Reveal
                as='section'
                className='flex flex-col gap-5'
                variant='blur'
              >
                <h2 className='text-2xl'>{t('architectureTitle')}</h2>
                <ArchitectureDiagram architecture={project.architecture} />
              </Reveal>
            ) : null}

            {project.metrics.length > 0 ? (
              <Reveal as='section' className='flex flex-col gap-5' delay={0.05}>
                <h2 className='text-2xl'>{t('metricsTitle')}</h2>
                <ProjectMetrics metrics={project.metrics} />
              </Reveal>
            ) : null}

            <section className='flex flex-col gap-5'>
              <h2 className='text-2xl'>{t('galleryTitle')}</h2>
              {project.media.gallery.length === 0 ? (
                <p className='rounded-[var(--radius-card)] border border-dashed border-[var(--border-strong)] p-6 text-sm text-[var(--text-muted)]'>
                  {t('galleryEmpty')}
                </p>
              ) : (
                <div className='grid gap-5 sm:grid-cols-2'>
                  {project.media.gallery.map((asset) => (
                    <MediaFrame
                      key={asset.src}
                      asset={asset}
                      locale={locale}
                      sizes='(min-width: 640px) 38rem, 100vw'
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className='flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start'>
            <Card className='flex flex-col gap-4 p-5'>
              <h2 className='font-mono text-xs tracking-[0.14em] text-[var(--text-muted)] uppercase'>
                {t('stackTitle')}
              </h2>
              <ul className='flex flex-wrap gap-2'>
                {project.stack.map((skillId) => (
                  <li
                    key={skillId}
                    className='rounded-[var(--radius-pill)] bg-[var(--surface-sunken)] px-3 py-1.5 font-mono text-xs text-[var(--text-secondary)]'
                  >
                    {skillLabels[skillId] ?? skillId}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>

        {related.length > 0 ? (
          <section className='mt-16 flex flex-col gap-6 border-t border-[var(--border-subtle)] pt-10'>
            <h2 className='text-2xl'>{t('relatedTitle')}</h2>
            <ul className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {related.map((relatedProject) => (
                <li key={relatedProject.slug}>
                  <ProjectCard
                    project={relatedProject}
                    stackLabels={
                      new Map(
                        relatedProject.stack.map((skillId) => [
                          skillId,
                          skillLabels[skillId] ?? skillId,
                        ])
                      )
                    }
                  />
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
};
