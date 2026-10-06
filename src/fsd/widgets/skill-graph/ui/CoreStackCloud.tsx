'use client';

import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import type { TSkill } from '@/entities/skill';
import { Magnetic, Reveal, VisuallyHidden } from '@/shared/ui';

import styles from './CoreStackCloud.module.scss';

type TCoreStackItem = {
  skill: TSkill;
  usage: number;
};

type ICoreStackCloudProps = {
  items: readonly TCoreStackItem[];
};

export const CoreStackCloud = ({ items }: ICoreStackCloudProps) => {
  const t = useTranslations('home');
  const stackT = useTranslations('stack');

  return (
    <div className={styles.panel}>
      <span aria-hidden='true' className={styles.glow} />

      <ul className={styles.grid}>
        {items.map(({ skill, usage }, index) => (
          <Reveal
            as='li'
            key={skill.id}
            delay={index * 0.08}
            variant='scale'
            distance={18}
          >
            <Magnetic durationMs={640} strength={0.6}>
              <span
                className={clsx(styles.chip, styles.chipMd)}
                title={stackT('usedIn', { count: usage })}
              >
                <span className={styles.name}>{skill.name}</span>
                <span className={styles.count} aria-hidden='true'>
                  {usage}
                </span>
                <VisuallyHidden>
                  {stackT('usedIn', { count: usage })}
                </VisuallyHidden>
              </span>
            </Magnetic>
          </Reveal>
        ))}
      </ul>

      <p className={styles.hint}>{t('stackHint')}</p>
    </div>
  );
};
