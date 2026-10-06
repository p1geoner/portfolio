'use client';

import { useReducedMotion } from 'motion/react';
import { type PropsWithChildren, type PointerEvent, useRef } from 'react';

const DEFAULT_MAX_SHIFT_PX = 10;
const DEFAULT_DURATION_MS = 320;

type MagneticProps = PropsWithChildren<{
  className?: string;
  /** Длительность возврата/следования, мс. */
  durationMs?: number;
  /** Множитель амплитуды сдвига (1 = по умолчанию). */
  strength?: number;
}>;

/**
 * Лёгкое притяжение элемента к курсору. Сдвиг пишется в CSS-переменную и
 * применяется через transform, поэтому анимация идёт в композиторе и не
 * вызывает пересчёт раскладки. При prefers-reduced-motion эффект выключен.
 */
export const Magnetic = ({
  children,
  className,
  durationMs = DEFAULT_DURATION_MS,
  strength = 1,
}: MagneticProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const maxShift = DEFAULT_MAX_SHIFT_PX * strength;

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>): void => {
    const element = containerRef.current;

    if (element === null || prefersReducedMotion) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const offsetX =
      (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
    const offsetY =
      (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);

    element.style.transform = `translate3d(${offsetX * maxShift}px, ${offsetY * maxShift}px, 0)`;
  };

  const handlePointerLeave = (): void => {
    const element = containerRef.current;

    if (element !== null) {
      element.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  return (
    <span
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{
        display: 'inline-flex',
        transition: `transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      {children}
    </span>
  );
};
