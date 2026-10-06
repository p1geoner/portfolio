'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { Button, CheckIcon, CopyIcon } from '@/shared/ui';

type CopyContactButtonProps = {
  value: string;
  label: string;
};

const RESET_DELAY_MS = 2000;

export const CopyContactButton = ({ value, label }: CopyContactButtonProps) => {
  const [copied, setCopied] = useState(false);
  const t = useTranslations('common');

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => {
      setCopied(false);
    }, RESET_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // Буфер обмена может быть недоступен без защищённого соединения —
      // адрес всё равно виден рядом и его можно выделить вручную.
    }
  };

  return (
    <Button
      variant='secondary'
      size='sm'
      onClick={() => void handleCopy()}
      aria-label={`${t('copy')}: ${label}`}
    >
      {copied ? (
        <CheckIcon width={14} height={14} />
      ) : (
        <CopyIcon width={14} height={14} />
      )}
      {copied ? t('copied') : t('copy')}
    </Button>
  );
};
