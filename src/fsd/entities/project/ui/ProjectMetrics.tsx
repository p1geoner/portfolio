import { useTranslations } from 'next-intl';

import { useAppLocale } from '@/shared/i18n';
import { Badge } from '@/shared/ui';

import type { TProjectMetric } from '../model/schema';

type ProjectMetricsProps = {
  metrics: readonly TProjectMetric[];
};

export const ProjectMetrics = ({ metrics }: ProjectMetricsProps) => {
  const locale = useAppLocale();
  const t = useTranslations('common');

  if (metrics.length === 0) {
    return null;
  }

  return (
    <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {metrics.map((metric) => (
        <li
          key={metric.id}
          className='flex flex-col gap-2 rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-5'
        >
          <span className='font-mono text-2xl leading-tight text-[var(--brand)]'>
            {metric.value[locale]}
          </span>
          <span className='text-sm leading-relaxed text-[var(--text-secondary)]'>
            {metric.label[locale]}
          </span>
          {metric.hint ? (
            <span className='text-xs leading-relaxed text-[var(--text-muted)]'>
              {metric.hint[locale]}
            </span>
          ) : null}
          {metric.estimated ? (
            <Badge tone='outline' className='self-start'>
              {t('estimated')}
            </Badge>
          ) : null}
        </li>
      ))}
    </ul>
  );
};
