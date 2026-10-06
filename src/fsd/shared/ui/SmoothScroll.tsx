'use client';

import Lenis from 'lenis';
import { useReducedMotion } from 'motion/react';
import { useEffect } from 'react';

/**
 * Инерционный скролл (Lenis) на всём сайте.
 * При prefers-reduced-motion не активируется — остаётся нативный скролл.
 */
export const SmoothScroll = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    document.documentElement.classList.add('lenis');

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('lenis');
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
};
