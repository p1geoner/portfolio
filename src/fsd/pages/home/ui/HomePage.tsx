import { getTranslations } from 'next-intl/server';

import { getWorkExperience } from '@/entities/experience';
import { getProfile, getPublicContacts } from '@/entities/profile';
import { getProjects, getStackUsage } from '@/entities/project';
import { getSkillLabels, getSkills } from '@/entities/skill';
import { getSiteConfig } from '@/shared/config';
import type { TLocale } from '@/shared/content';
import {
  JsonLd,
  buildAbsoluteUrl,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebSiteSchema,
} from '@/shared/seo';
import {
  ArrowRightIcon,
  ButtonLink,
  Reveal,
  Section,
  SectionHeading,
} from '@/shared/ui';
import { ArchitectureDiagram } from '@/widgets/architecture-diagram';
import { ContactBlock } from '@/widgets/contact-block';
import { FlagshipShowcase } from '@/widgets/flagship-showcase';
import { Hero } from '@/widgets/hero';
import { CoreStackCloud } from '@/widgets/skill-graph';

const TOP_SKILL_LIMIT = 14;

type IHomePageProps = {
  locale: TLocale;
};

export const HomePage = async ({ locale }: IHomePageProps) => {
  const t = await getTranslations({ locale, namespace: 'home' });

  const site = getSiteConfig();
  const profile = getProfile();
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
  const stackUsage = getStackUsage();
  const workExperience = getWorkExperience();
  const currentRole = workExperience.at(0);

  const topSkills = getSkills()
    .filter((skill) => (stackUsage[skill.id] ?? 0) > 0)
    .sort(
      (left, right) =>
        (stackUsage[right.id] ?? 0) - (stackUsage[left.id] ?? 0) ||
        left.name.localeCompare(right.name)
    )
    .slice(0, TOP_SKILL_LIMIT);

  const homeUrl = buildAbsoluteUrl(locale, '/');
  const contacts = getPublicContacts();

  const person = buildPersonSchema({
    name: profile.name[locale],
    jobTitle: profile.role[locale],
    description: profile.tagline[locale],
    url: homeUrl,
    imageUrl: `${site.url}${profile.photo.src}`,
    email: contacts.find((contact) => contact.channel === 'email')?.value,
    sameAs: contacts
      .filter((contact) => contact.value.startsWith('http'))
      .map((contact) => contact.value),
    locality: profile.location[locale],
    knowsAbout: getSkills().map((skill) => skill.name),
    worksFor:
      currentRole === undefined
        ? undefined
        : {
            name: currentRole.organization[locale],
            description: currentRole.summary[locale],
          },
  });

  return (
    <>
      <JsonLd data={person} />
      <JsonLd
        data={buildProfilePageSchema({
          url: homeUrl,
          name: site.title[locale],
          description: site.description[locale],
          person,
        })}
      />
      <JsonLd
        data={buildWebSiteSchema({
          url: homeUrl,
          name: site.name[locale],
          description: site.description[locale],
          inLanguage: locale,
          authorName: profile.name[locale],
        })}
      />

      <Hero />

      <Section tone='sunken'>
        <FlagshipShowcase
          projects={projects}
          stackLabelsByProject={stackLabelsByProject}
          architecturePreviews={
            site.features.projectArchitecture
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
              : {}
          }
        />
      </Section>

      <Section>
        <Reveal variant='left'>
          <SectionHeading
            title={t('stackTitle')}
            description={t('stackSubtitle')}
            action={
              <ButtonLink href='/stack' variant='secondary' size='sm'>
                {t('stackCta')}
                <ArrowRightIcon />
              </ButtonLink>
            }
          />
        </Reveal>

        <Reveal delay={0.08} variant='up'>
          <CoreStackCloud
            items={topSkills.map((skill) => ({
              skill,
              usage: stackUsage[skill.id] ?? 0,
            }))}
          />
        </Reveal>
      </Section>

      <Section tone='sunken'>
        <Reveal variant='up'>
          <SectionHeading
            title={t('contactTitle')}
            description={t('contactText')}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <ContactBlock />
        </Reveal>
      </Section>
    </>
  );
};
