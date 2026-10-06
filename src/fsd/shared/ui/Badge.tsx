import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

export type TBadgeTone = 'neutral' | 'brand' | 'outline' | 'support';

const TONE_CLASS: Record<TBadgeTone, string> = {
  neutral: 'bg-[var(--surface-sunken)] text-[var(--text-secondary)]',
  brand: 'bg-[var(--brand-surface)] text-[var(--brand-on-surface)]',
  outline:
    'border border-[var(--border-subtle)] text-[var(--text-muted)] bg-transparent',
  support:
    'bg-[color-mix(in_oklab,var(--color-support)_12%,transparent)] text-[var(--color-support)]',
};

type BadgeProps = PropsWithChildren<{
  tone?: TBadgeTone;
  className?: string;
  title?: string;
}>;

export const Badge = ({
  children,
  tone = 'neutral',
  className,
  title,
}: BadgeProps) => (
  <span
    title={title}
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-2.5 py-1 text-xs font-medium whitespace-nowrap',
      TONE_CLASS[tone],
      className
    )}
  >
    {children}
  </span>
);
