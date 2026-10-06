import { useTranslations } from 'next-intl';

import { ArrowRightIcon, ButtonLink, Container } from '@/shared/ui';

export const NotFoundPage = () => {
  const t = useTranslations('notFound');

  return (
    <Container className='flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center'>
      <p className='font-mono text-6xl text-[var(--brand)]'>404</p>
      <h1 className='text-balance-tight text-3xl md:text-4xl'>{t('title')}</h1>
      <p className='max-w-md text-[var(--text-secondary)]'>{t('text')}</p>
      <ButtonLink href='/'>
        {t('cta')}
        <ArrowRightIcon />
      </ButtonLink>
    </Container>
  );
};
