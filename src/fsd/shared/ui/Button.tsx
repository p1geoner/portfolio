import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { Link } from '../i18n';

export type TButtonVariant = 'primary' | 'secondary' | 'ghost';
export type TButtonSize = 'md' | 'sm' | 'icon';

const BASE_CLASS =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] font-medium transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50';

const VARIANT_CLASS: Record<TButtonVariant, string> = {
  primary:
    'bg-[var(--brand)] text-[var(--brand-contrast)] hover:bg-[var(--color-accent-strong)] dark:hover:brightness-110',
  secondary:
    'border border-[var(--border-strong)] bg-[var(--surface-raised)] text-[var(--text-primary)] hover:border-[var(--brand)] hover:text-[var(--brand)]',
  ghost:
    'text-[var(--text-secondary)] hover:bg-[var(--surface-sunken)] hover:text-[var(--text-primary)]',
};

const SIZE_CLASS: Record<TButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-4 text-sm',
  /** Квадрат без внутренних отступов: иконка не сжимается flex-ом. */
  icon: 'h-9 w-9',
};

const buildClassName = (
  variant: TButtonVariant,
  size: TButtonSize,
  className?: string
) => clsx(BASE_CLASS, VARIANT_CLASS[variant], SIZE_CLASS[size], className);

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: TButtonVariant;
    size?: TButtonSize;
  }
>;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...rest
}: ButtonProps) => (
  <button
    type={type}
    className={buildClassName(variant, size, className)}
    {...rest}
  >
    {children}
  </button>
);

type InternalLinkProps = PropsWithChildren<{
  href: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  className?: string;
  ariaLabel?: string;
}>;

/** Внутренняя ссылка-кнопка: локаль подставляет i18n-навигация. */
export const ButtonLink = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ariaLabel,
}: InternalLinkProps) => (
  <Link
    href={href}
    aria-label={ariaLabel}
    className={buildClassName(variant, size, className)}
  >
    {children}
  </Link>
);

type ExternalLinkProps = PropsWithChildren<{
  href: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
  className?: string;
}>;

/**
 * Внешняя ссылка: noopener и noreferrer обязательны, иначе целевая страница
 * получает доступ к window.opener и реферер уходит наружу.
 */
export const ExternalButtonLink = ({
  children,
  href,
  variant = 'secondary',
  size = 'md',
  className,
}: ExternalLinkProps) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className={buildClassName(variant, size, className)}
  >
    {children}
  </a>
);
