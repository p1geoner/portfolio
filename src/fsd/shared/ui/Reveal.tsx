'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'motion/react';
import type { PropsWithChildren } from 'react';

export type TRevealVariant =
  'up' | 'down' | 'left' | 'right' | 'scale' | 'blur';

type TRevealProps = PropsWithChildren<{
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
  variant?: TRevealVariant;
  /** Насколько далеко уезжает элемент до появления. */
  distance?: number;
}>;

const EASE = [0.22, 1, 0.36, 1] as const;

const getInitial = (variant: TRevealVariant, distance: number) => {
  switch (variant) {
    case 'down':
      return { opacity: 0, y: -distance };
    case 'left':
      return { opacity: 0, x: -distance };
    case 'right':
      return { opacity: 0, x: distance };
    case 'scale':
      return { opacity: 0, scale: 0.94 };
    case 'blur':
      return { opacity: 0, y: distance * 0.5, filter: 'blur(8px)' };
    case 'up':
    default:
      return { opacity: 0, y: distance };
  }
};

const getVisible = (variant: TRevealVariant) => {
  if (variant === 'blur') {
    return { opacity: 1, y: 0, filter: 'blur(0px)' };
  }

  if (variant === 'scale') {
    return { opacity: 1, scale: 1 };
  }

  if (variant === 'left' || variant === 'right') {
    return { opacity: 1, x: 0 };
  }

  return { opacity: 1, y: 0 };
};

/**
 * Появление блока при попадании в вьюпорт. Анимируются только opacity и
 * transform (плюс blur в одном варианте) — без пересчёта раскладки.
 */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as = 'div',
  variant = 'up',
  distance = 28,
}: TRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={clsx(className)}
      initial={getInitial(variant, distance)}
      whileInView={getVisible(variant)}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
};

type TStaggerProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  stagger?: number;
}>;

/** Контейнер: дочерние Reveal получают нарастающую задержку через CSS-переменную не нужен — delay вручную. */
export const Stagger = ({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: TStaggerProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-8% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

type TStaggerItemProps = PropsWithChildren<{
  className?: string;
  variant?: TRevealVariant;
  as?: 'div' | 'li';
}>;

export const StaggerItem = ({
  children,
  className,
  variant = 'up',
  as = 'div',
}: TStaggerItemProps) => {
  const prefersReducedMotion = useReducedMotion();
  const Component = motion[as];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: getInitial(variant, 24),
        visible: getVisible(variant),
      }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {children}
    </Component>
  );
};
