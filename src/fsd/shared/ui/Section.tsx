import clsx from 'clsx';
import type { PropsWithChildren, ReactNode } from 'react';

import { Container } from './Container';

type ISectionProps = PropsWithChildren<{
  id?: string;
  className?: string;
  tone?: 'page' | 'sunken';
  compact?: boolean;
}>;

export const Section = ({
  id,
  className,
  children,
  tone = 'page',
  compact = false,
}: ISectionProps) => (
  <section
    id={id}
    className={clsx(
      compact ? 'py-12 md:py-16' : 'py-16 md:py-24',
      /*
       * Лёгкая прозрачность, чтобы ambient-фон «просвечивал» и секции
       * не выглядели плоскими плитками поверх атмосферы.
       */
      tone === 'sunken' &&
        'bg-[color-mix(in_oklab,var(--surface-sunken)_72%,transparent)]',
      className
    )}
  >
    <Container>{children}</Container>
  </section>
);

type ISectionHeadingProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
  /** На странице ровно один h1 — это заголовок самой страницы. */
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
};

export const SectionHeading = ({
  title,
  description,
  eyebrow,
  action,
  level: Heading = 'h2',
  className,
}: ISectionHeadingProps) => (
  <div
    className={clsx(
      'mb-8 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between',
      className
    )}
  >
    <div className='max-w-2xl'>
      {eyebrow ? (
        <p className='mb-3 font-mono text-xs tracking-[0.18em] text-[var(--brand)] uppercase'>
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={clsx(
          'text-balance-tight',
          Heading === 'h1' ? 'text-3xl md:text-5xl' : 'text-3xl md:text-4xl'
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p className='mt-3 text-base text-[var(--text-secondary)] md:text-lg'>
          {description}
        </p>
      ) : null}
    </div>
    {action ? <div className='shrink-0'>{action}</div> : null}
  </div>
);
