'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { TLocale, TMediaAsset } from '../content';

type MediaFrameProps = {
  asset: TMediaAsset;
  locale: TLocale;
  /** Первый кадр на странице грузим приоритетно — он влияет на LCP. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  /**
   * Скринкаст вместо обложки: играет сам, без звука, только пока кадр в зоне видимости.
   */
  autoPlay?: boolean;
};

const FRAME_CLASS =
  'relative isolate overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-sunken)] [--frame-radius:var(--radius-card)] [--media-radius:calc(var(--frame-radius)-var(--radius-stroke)-var(--radius-media-inset))]';

/**
 * border-radius на figure не обрезает кадр video: слой видео рисуется квадратом.
 * clip-path режет медиа меньшим радиусом, чем рамка: внешний угол минус обводка и отступ.
 */
const MEDIA_CLASS =
  'h-full w-full rounded-[var(--media-radius)] object-cover [clip-path:inset(0_round_var(--media-radius))]';

export const MediaFrame = ({
  asset,
  locale,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
  autoPlay = false,
}: MediaFrameProps) => {
  const alt = asset.alt[locale];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!autoPlay || video === null) {
      return;
    }

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionQuery.matches) {
      return;
    }

    let visible = false;
    let retryId = 0;

    const start = () => {
      if (!visible) {
        return;
      }

      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const ensurePlaying = () => {
      start();
      window.clearTimeout(retryId);
      retryId = window.setTimeout(() => {
        if (visible && video.paused) {
          start();
        }
      }, 400);
    };

    // Пауза только когда кадр совсем ушёл из зоны: порог 0.35 на анимации
    // слайдера дёргает ratio и обрывает play() на полуслове.
    const sync = (ratio: number) => {
      if (ratio >= 0.35) {
        visible = true;
        ensurePlaying();
        return;
      }

      if (ratio === 0) {
        visible = false;
        video.pause();
      }
    };

    const ratioFromRect = () => {
      const rect = video.getBoundingClientRect();

      if (rect.height === 0) {
        return 0;
      }

      const visibleHeight =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);

      return Math.max(0, visibleHeight / rect.height);
    };

    const measure = () => {
      sync(ratioFromRect());
    };

    // Наблюдатель ловит появление кадра даже если событие scroll не пришло.
    // Паузу сверяем с геометрией: у него бывает ложный ratio 0 на видимом видео.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry === undefined) {
          return;
        }

        if (entry.intersectionRatio >= 0.35) {
          sync(entry.intersectionRatio);
          return;
        }

        sync(ratioFromRect());
      },
      {
        threshold: [0, 0.35],
      }
    );

    observer.observe(video);
    measure();
    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    video.addEventListener('loadeddata', start);

    return () => {
      observer.disconnect();
      window.clearTimeout(retryId);
      window.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
      video.removeEventListener('loadeddata', start);
    };
  }, [autoPlay]);

  if (asset.kind === 'video') {
    return (
      <figure className={clsx(FRAME_CLASS, className)}>
        <video
          ref={videoRef}
          className={MEDIA_CLASS}
          poster={asset.poster}
          preload={autoPlay ? 'metadata' : 'none'}
          controls={!autoPlay}
          muted={autoPlay}
          loop={autoPlay}
          playsInline
          width={asset.width}
          height={asset.height}
          aria-label={alt}
        >
          <source src={asset.src} type='video/mp4' />
        </video>
        {asset.caption ? (
          <figcaption className='px-4 py-3 text-sm text-[var(--text-muted)]'>
            {asset.caption[locale]}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={clsx(FRAME_CLASS, className)}>
      <Image
        src={asset.src}
        alt={alt}
        width={asset.width}
        height={asset.height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        // Анимацию gif оптимизатор изображений вырезает, поэтому отдаём как есть.
        unoptimized={asset.kind === 'gif'}
        className={MEDIA_CLASS}
      />
      {asset.caption ? (
        <figcaption className='px-4 py-3 text-sm text-[var(--text-muted)]'>
          {asset.caption[locale]}
        </figcaption>
      ) : null}
    </figure>
  );
};

type MediaPlaceholderProps = {
  seed: string;
  label: string;
  ratio?: 'wide' | 'square';
  className?: string;
};

/**
 * Пока скриншот не загружен, показываем спокойную заглушку с постоянным
 * оттенком: цвет выводится из seed, поэтому у одного проекта он не меняется
 * между рендерами и не создаёт визуального шума.
 */
export const MediaPlaceholder = ({
  seed,
  label,
  ratio = 'wide',
  className,
}: MediaPlaceholderProps) => {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 360;
  }

  return (
    <div
      className={clsx(
        FRAME_CLASS,
        'flex items-center justify-center',
        ratio === 'wide' ? 'aspect-[16/10]' : 'aspect-square',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(${hash} 24% 94%) 0%, hsl(${(hash + 40) % 360} 20% 88%) 100%)`,
      }}
    >
      <span className='px-6 text-center font-mono text-xs tracking-[0.14em] text-[var(--color-ink-soft)] uppercase'>
        {label}
      </span>
    </div>
  );
};
