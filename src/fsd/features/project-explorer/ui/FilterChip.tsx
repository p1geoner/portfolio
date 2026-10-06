'use client';

import clsx from 'clsx';

type FilterChipProps = {
  label: string;
  active: boolean;
  count?: number;
  onToggle: () => void;
};

export const FilterChip = ({
  label,
  active,
  count,
  onToggle,
}: FilterChipProps) => (
  <button
    type='button'
    aria-pressed={active}
    onClick={onToggle}
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-3 py-1.5 text-sm transition-colors duration-200',
      active
        ? 'border-[var(--brand)] bg-[var(--brand-surface)] text-[var(--brand-on-surface)]'
        : 'border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]'
    )}
  >
    {label}
    {count === undefined ? null : (
      <span className='font-mono text-xs text-[var(--text-muted)]'>
        {count}
      </span>
    )}
  </button>
);
