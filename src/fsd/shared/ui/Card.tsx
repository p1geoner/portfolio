import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type ICardProps = PropsWithChildren<{
  className?: string;
  as?: 'article' | 'div' | 'li';
  interactive?: boolean;
}>;

export const Card = ({
  children,
  className,
  as: Tag = 'div',
  interactive = false,
}: ICardProps) => (
  <Tag
    className={clsx(
      'relative rounded-[var(--radius-card)] bg-[color-mix(in_oklab,var(--surface-raised)_82%,transparent)]',
      interactive
        ? 'border border-transparent transition-[background-color,box-shadow,transform,border-color] duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-[var(--border-subtle)] hover:bg-[var(--surface-raised)] hover:shadow-[var(--shadow-lift)]'
        : 'border border-[color-mix(in_oklab,var(--border-subtle)_55%,transparent)]',
      className
    )}
  >
    {children}
  </Tag>
);
