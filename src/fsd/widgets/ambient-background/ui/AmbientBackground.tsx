'use client';

import { useReducedMotion } from 'motion/react';

import styles from './AmbientBackground.module.scss';

/**
 * Атмосферный фон без WebGL и без лишнего JS: CSS-анимации на
 * transform/opacity. При prefers-reduced-motion остаётся статичный градиент.
 */
export const AmbientBackground = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden='true'
      className={styles.root}
      data-static={prefersReducedMotion ? 'true' : undefined}
    >
      <span className={styles.mesh} />
      <span className={`${styles.blob} ${styles.blobA}`} />
      <span className={`${styles.blob} ${styles.blobB}`} />
      <span className={`${styles.blob} ${styles.blobC}`} />
      <span className={styles.grain} />
    </div>
  );
};
