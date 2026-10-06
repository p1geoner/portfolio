'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';

import type { TProject } from '@/entities/project';
import { useAppLocale } from '@/shared/i18n';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MediaFrame,
  MediaPlaceholder,
  SkillIcon,
} from '@/shared/ui';

import styles from './CaseContentSlider.module.scss';

const PANEL_IDS = ['cover', 'highlights', 'stack', 'architecture'] as const;
type TPanelId = (typeof PANEL_IDS)[number];
const PANELS_WITHOUT_ARCHITECTURE: readonly TPanelId[] = PANEL_IDS.filter(
  (id) => id !== 'architecture'
);

const DRAG_THRESHOLD = 48;
const EASE = [0.22, 1, 0.36, 1] as const;

type ICaseContentSliderProps = {
  project: TProject;
  stackLabels: ReadonlyMap<string, string>;
  priority?: boolean;
  /** Превью архитектуры собирает page-слой (чтобы виджеты не импортировали друг друга). */
  architecturePreview: ReactNode;
};

const panelTitleKey = (
  id: TPanelId
): 'panelCover' | 'panelHighlights' | 'panelStack' | 'panelArchitecture' => {
  switch (id) {
    case 'cover':
      return 'panelCover';
    case 'highlights':
      return 'panelHighlights';
    case 'stack':
      return 'panelStack';
    case 'architecture':
      return 'panelArchitecture';
  }
};

export const CaseContentSlider = ({
  project,
  stackLabels,
  priority = false,
  architecturePreview,
}: ICaseContentSliderProps) => {
  const locale = useAppLocale();
  const t = useTranslations('home.showcase');
  const prefersReducedMotion = useReducedMotion();
  const labelId = useId();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const dragOriginX = useRef<number | null>(null);
  const panelIds =
    architecturePreview == null ? PANELS_WITHOUT_ARCHITECTURE : PANEL_IDS;
  const panelId = panelIds[index] ?? panelIds[0]!;
  const lastIndex = panelIds.length - 1;

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(lastIndex, next));
    setDirection(clamped > index ? 1 : -1);
    setIndex(clamped);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    dragOriginX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragOriginX.current === null) return;
    const delta = event.clientX - dragOriginX.current;
    dragOriginX.current = null;
    if (Math.abs(delta) < DRAG_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  const renderPanel = (id: TPanelId) => {
    switch (id) {
      case 'cover':
        return project.media.cover === null ? (
          <MediaPlaceholder
            seed={project.slug}
            label={t('mediaPlaceholder')}
            className='!aspect-auto h-full min-h-full rounded-none border-0'
          />
        ) : (
          <MediaFrame
            asset={project.media.cover}
            locale={locale}
            priority={priority}
            autoPlay={project.media.cover.kind === 'video'}
            sizes='(min-width: 1024px) 40vw, 100vw'
            className='!aspect-auto h-full min-h-full rounded-none border-0'
          />
        );
      case 'highlights':
        return (
          <>
            <p className={styles.panelTitle}>{t('panelHighlights')}</p>
            <ul className={styles.highlights}>
              {project.highlights[locale].slice(0, 5).map((item) => (
                <li key={item} className={styles.highlight}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        );
      case 'stack':
        return (
          <>
            <p className={styles.panelTitle}>{t('panelStack')}</p>
            <ul className={styles.stack}>
              {project.stack.map((skillId) => (
                <li key={skillId} className={styles.stackItem}>
                  <SkillIcon skillId={skillId} width={12} height={12} />
                  <span>{stackLabels.get(skillId) ?? skillId}</span>
                </li>
              ))}
            </ul>
          </>
        );
      case 'architecture':
        return (
          <div className={styles.archPreview}>
            <p className={styles.panelTitle}>{t('panelArchitecture')}</p>
            {architecturePreview}
          </div>
        );
    }
  };

  if (prefersReducedMotion) {
    return (
      <div className={styles.root}>
        {panelIds.map((id) => (
          <section
            key={id}
            className={styles.viewport}
            aria-labelledby={`${labelId}-${id}`}
          >
            <h3 id={`${labelId}-${id}`} className='sr-only'>
              {t(panelTitleKey(id))}
            </h3>
            <div
              className={
                id === 'cover'
                  ? `${styles.panel} ${styles.panelMedia}`
                  : styles.panel
              }
              style={{ position: 'relative' }}
            >
              {renderPanel(id)}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div
        className={styles.viewport}
        role='region'
        aria-roledescription='carousel'
        aria-label={t('sliderLabel', { name: project.name[locale] })}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <AnimatePresence initial={false} custom={direction} mode='wait'>
          <motion.div
            key={panelId}
            className={
              panelId === 'cover'
                ? `${styles.panel} ${styles.panelMedia}`
                : styles.panel
            }
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 36 : -36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -28 : 28 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {renderPanel(panelId)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.nav}>
        <ul
          className={styles.dots}
          role='tablist'
          aria-label={t('panelsLabel')}
        >
          {panelIds.map((id, panelIndex) => (
            <li key={id} role='presentation'>
              <button
                type='button'
                role='tab'
                aria-selected={panelIndex === index}
                className={
                  panelIndex === index
                    ? `${styles.dot} ${styles.dotActive}`
                    : styles.dot
                }
                onClick={() => goTo(panelIndex)}
              >
                {t(panelTitleKey(id))}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.arrows}>
          <button
            type='button'
            className={styles.arrow}
            aria-label={t('prevPanel')}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
          >
            <ArrowLeftIcon width={14} height={14} />
          </button>
          <button
            type='button'
            className={styles.arrow}
            aria-label={t('nextPanel')}
            disabled={index === panelIds.length - 1}
            onClick={() => goTo(index + 1)}
          >
            <ArrowRightIcon width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
