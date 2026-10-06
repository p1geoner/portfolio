'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { ArrowUpIcon } from './icons';
import { VisuallyHidden } from './VisuallyHidden';

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('common');

  useEffect(() => {
    const sentinel = sentinelRef.current;

    if (sentinel === null) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry !== undefined && !entry.isIntersecting);
    });

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Маркер первого экрана: кнопка появляется, когда он уходит из вида. */}
      <div
        ref={sentinelRef}
        aria-hidden='true'
        className='absolute top-[80vh] h-px w-full'
      />

      <button
        type='button'
        onClick={scrollToTop}
        tabIndex={visible ? 0 : -1}
        aria-hidden={!visible}
        className={clsx(
          'fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] text-[var(--text-secondary)] shadow-[var(--shadow-soft)] transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] hover:text-[var(--brand)]',
          visible
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-3 opacity-0'
        )}
      >
        <ArrowUpIcon width={18} height={18} />
        <VisuallyHidden>{t('backToTop')}</VisuallyHidden>
      </button>
    </>
  );
};
