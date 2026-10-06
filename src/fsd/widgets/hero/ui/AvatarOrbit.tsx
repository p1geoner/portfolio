'use client';

import clsx from 'clsx';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';

import styles from './AvatarOrbit.module.scss';

type TOrbitSymbol = {
  id: string;
  label: string;
  accent?: boolean;
  /** Стартовая фаза на орбите, радианы. 0 — справа, π/2 — снизу (спереди). */
  phase: number;
};

/**
 * Символы фронтенда на эллиптической орбите вокруг аватара.
 * Снизу (sin > 0) — поверх фото, сверху — заходят за картинку.
 */
const SYMBOLS: readonly TOrbitSymbol[] = [
  { id: 'jsx', label: '</>', accent: true, phase: 0.15 },
  { id: 'hooks', label: '{}', phase: 0.95 },
  { id: 'tsx', label: 'tsx', accent: true, phase: 1.75 },
  { id: 'css', label: '#css', phase: 2.55 },
  { id: 'fn', label: '()=>', phase: 3.35 },
  { id: 'react', label: 'use*', phase: 4.15 },
  { id: 'async', label: 'await', accent: true, phase: 4.95 },
  { id: 'html', label: '<>', phase: 5.75 },
];

/** Полный оборот, секунды. */
const ORBIT_PERIOD = 20;
const TWO_PI = Math.PI * 2;

type TRadii = { x: number; y: number };

type IOrbitSymbolProps = {
  symbol: TOrbitSymbol;
  radii: TRadii;
  prefersReducedMotion: boolean | null;
};

const OrbitSymbol = ({
  symbol,
  radii,
  prefersReducedMotion,
}: IOrbitSymbolProps) => {
  const angle = useMotionValue(symbol.phase);
  const radiusX = useMotionValue(radii.x);
  const radiusY = useMotionValue(radii.y);

  useLayoutEffect(() => {
    radiusX.set(radii.x);
    radiusY.set(radii.y);
  }, [radii.x, radii.y, radiusX, radiusY]);

  useAnimationFrame((time) => {
    if (prefersReducedMotion) return;
    const turns = time / 1000 / ORBIT_PERIOD;
    angle.set(symbol.phase + turns * TWO_PI);
  });

  const x = useTransform(
    [angle, radiusX] as MotionValue<number>[],
    ([a, rx]: number[]) => Math.cos(a) * rx
  );
  const y = useTransform(
    [angle, radiusY] as MotionValue<number>[],
    ([a, ry]: number[]) => Math.sin(a) * ry
  );
  // Низ орбиты — перед фото (z > 1), верх — за фото (z < 1).
  const zIndex = useTransform(angle, (a) => (Math.sin(a) > 0 ? 2 : 0));
  const scale = useTransform(angle, (a) => {
    const depth = (Math.sin(a) + 1) / 2;
    return 0.84 + 0.28 * depth;
  });
  const opacity = useTransform(angle, (a) => {
    const depth = (Math.sin(a) + 1) / 2;
    return 0.48 + 0.48 * depth;
  });

  if (prefersReducedMotion) {
    const a = symbol.phase;
    const depth = (Math.sin(a) + 1) / 2;

    return (
      <span
        className={styles.anchor}
        aria-hidden='true'
        style={{
          transform: `translate(${Math.cos(a) * radii.x}px, ${Math.sin(a) * radii.y}px)`,
          zIndex: Math.sin(a) > 0 ? 2 : 0,
        }}
      >
        <span
          className={clsx(styles.symbol, symbol.accent && styles.symbolAccent)}
          style={{
            opacity: 0.48 + 0.48 * depth,
            transform: `scale(${0.84 + 0.28 * depth})`,
          }}
        >
          {symbol.label}
        </span>
      </span>
    );
  }

  return (
    <motion.span
      className={styles.anchor}
      aria-hidden='true'
      style={{ x, y, zIndex }}
    >
      <motion.span
        className={clsx(styles.symbol, symbol.accent && styles.symbolAccent)}
        style={{ scale, opacity }}
      >
        {symbol.label}
      </motion.span>
    </motion.span>
  );
};

export const AvatarOrbit = () => {
  const prefersReducedMotion = useReducedMotion();
  const measureRef = useRef<HTMLDivElement>(null);
  const [radii, setRadii] = useState<TRadii>({ x: 128, y: 148 });

  useLayoutEffect(() => {
    const parent = measureRef.current?.parentElement;
    if (parent === undefined || parent === null) return;

    const update = (width: number, height: number) => {
      setRadii({
        x: Math.max(96, width * 0.58),
        y: Math.max(110, height * 0.52),
      });
    };

    update(parent.clientWidth, parent.clientHeight);

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry === undefined) return;
      const { width, height } = entry.contentRect;
      update(width, height);
    });

    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={measureRef} className={styles.measure} aria-hidden='true' />
      {SYMBOLS.map((symbol) => (
        <OrbitSymbol
          key={symbol.id}
          symbol={symbol}
          radii={radii}
          prefersReducedMotion={prefersReducedMotion}
        />
      ))}
    </>
  );
};
