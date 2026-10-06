'use client';

import type { ReactNode } from 'react';

import type { TProject } from '@/entities/project';

import { FlagshipCase } from './FlagshipCase';

type IFlagshipShowcaseProps = {
  projects: readonly TProject[];
  stackLabelsByProject: Readonly<
    Record<string, Readonly<Record<string, string>>>
  >;
  /** Превью архитектуры собирает page-слой и передаёт как ReactNode. */
  architecturePreviews: Readonly<Record<string, ReactNode>>;
};

export const FlagshipShowcase = ({
  projects,
  stackLabelsByProject,
  architecturePreviews,
}: IFlagshipShowcaseProps) => (
  <div className='flex flex-col divide-y divide-[color-mix(in_oklab,var(--border-subtle)_80%,transparent)]'>
    {projects.map((project, index) => {
      const labels = stackLabelsByProject[project.slug] ?? {};
      return (
        <FlagshipCase
          key={project.slug}
          project={project}
          stackLabels={new Map(Object.entries(labels))}
          priority={index === 0}
          architecturePreview={architecturePreviews[project.slug] ?? null}
        />
      );
    })}
  </div>
);
