'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import type { TProject } from '@/entities/project';
import { formatPeriod } from '@/shared/datetime';
import { useAppLocale } from '@/shared/i18n';
import {
  ArrowRightIcon,
  Badge,
  ButtonLink,
  LockIcon,
} from '@/shared/ui';

import { CaseContentSlider } from './CaseContentSlider';
import styles from './FlagshipCase.module.scss';

type IFlagshipCaseProps = {
  project: TProject;
  stackLabels: ReadonlyMap<string, string>;
  priority?: boolean;
  architecturePreview: ReactNode;
};

export const FlagshipCase = ({
  project,
  stackLabels,
  priority = false,
  architecturePreview,
}: IFlagshipCaseProps) => {
  const locale = useAppLocale();
  const t = useTranslations('home');
  const projectsT = useTranslations('projects');
  const common = useTranslations('common');

  return (
    <article className={styles.case}>
      <div className={styles.meta}>
        <div className={styles.badges}>
          <Badge tone='brand'>{projectsT(`tier.${project.tier}`)}</Badge>
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

        <p className={styles.role}>{project.role[locale]}</p>
        <h4 className={styles.title}>{project.name[locale]}</h4>
        <p className={styles.tagline}>{project.tagline[locale]}</p>
        <p className={styles.period}>
          {formatPeriod(project.period, locale, common('present'))}
        </p>

        <div className={styles.actions}>
          <ButtonLink href={`/projects/${project.slug}`}>
            {t('showcase.openCase')}
            <ArrowRightIcon width={14} height={14} />
          </ButtonLink>
        </div>
      </div>

      <div className={styles.slider}>
        <CaseContentSlider
          project={project}
          stackLabels={stackLabels}
          priority={priority}
          architecturePreview={architecturePreview}
        />
      </div>
    </article>
  );
};
