'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { getProfile } from '@/entities/profile';
import type { TLocale } from '@/shared/content';
import { useAppLocale } from '@/shared/i18n';
import {
  ArrowRightIcon,
  Badge,
  ButtonLink,
  Container,
  Magnetic,
  Prose,
  Reveal,
  Stagger,
  StaggerItem,
} from '@/shared/ui';

import { AvatarOrbit } from './AvatarOrbit';
import portraitStyles from './PortraitGlow.module.scss';

const Portrait = ({ locale }: { locale: TLocale }) => {
  const profile = getProfile();

  return (
    <div className={portraitStyles.frame}>
      <div className={portraitStyles.glow} aria-hidden='true' />
      <AvatarOrbit />
      <Image
        src={profile.photo.src}
        alt={profile.photo.alt[locale]}
        width={profile.photo.width}
        height={profile.photo.height}
        priority
        sizes='240px'
        className={portraitStyles.photo}
      />
    </div>
  );
};

export const Hero = () => {
  const locale = useAppLocale();
  const t = useTranslations('home');
  const profile = getProfile();

  return (
    <section className='relative pt-10 pb-14 md:pt-16 md:pb-20'>
      <Container className='grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14'>
        <div className='flex flex-col gap-6'>
          <Reveal variant='blur' distance={16} className='self-start'>
            <Badge tone='brand'>
              <span
                aria-hidden='true'
                className='h-1.5 w-1.5 animate-pulse rounded-full bg-current'
              />
              {t('heroBadge')}
            </Badge>
          </Reveal>

          <Reveal delay={0.05}>
            <p className='font-mono text-sm tracking-[0.16em] text-[var(--text-muted)] uppercase'>
              {profile.role[locale]}
            </p>
          </Reveal>

          <Reveal
            variant='scale'
            delay={0.12}
            className='relative mx-auto w-full max-w-[240px] lg:hidden'
          >
            <Portrait locale={locale} />
          </Reveal>

          <Stagger className='flex flex-col gap-4' delay={0.15} stagger={0.1}>
            <StaggerItem variant='blur'>
              <h1 className='text-balance-tight text-4xl leading-[1.08] md:text-5xl lg:text-6xl'>
                {profile.name[locale]}
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className='max-w-xl text-lg leading-relaxed text-[var(--text-secondary)]'>
                {profile.tagline[locale]}
              </p>
            </StaggerItem>
          </Stagger>

          <Reveal delay={0.35}>
            <div className='flex flex-wrap items-center gap-3'>
              <Magnetic>
                <ButtonLink href='/projects'>
                  {t('primaryCta')}
                  <ArrowRightIcon />
                </ButtonLink>
              </Magnetic>
              <ButtonLink href='/contacts' variant='secondary'>
                {t('secondaryCta')}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <dl className='mt-2 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-4'>
              {profile.facts.map((fact) => (
                <div key={fact.id} className='flex flex-col gap-1'>
                  <dt className='font-mono text-lg text-[var(--text-primary)]'>
                    {fact.value[locale]}
                  </dt>
                  <dd className='text-xs leading-snug text-[var(--text-muted)]'>
                    {fact.label[locale]}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal
          variant='scale'
          delay={0.2}
          className='relative mx-auto hidden w-full max-w-[240px] lg:block lg:justify-self-end'
        >
          <Portrait locale={locale} />
        </Reveal>
      </Container>

      <Container className='mt-14 md:mt-20'>
        <Reveal variant='up'>
          <div className='grid gap-8 border-t border-[var(--border-subtle)] pt-10 md:grid-cols-[240px_1fr] md:gap-16'>
            <h2 className='font-mono text-sm tracking-[0.16em] text-[var(--text-muted)] uppercase'>
              {t('aboutTitle')}
            </h2>
            <div className='flex flex-col items-start gap-6'>
              <Prose paragraphs={profile.bio[locale]} size='lg' />
              <ButtonLink href='/experience' variant='secondary'>
                {t('experienceCta')}
                <ArrowRightIcon />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
