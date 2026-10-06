'use client';

import { useEffect, useState } from 'react';

/**
 * Задержка перед применением значения: пересчёт выдачи не запускается
 * на каждое нажатие клавиши.
 */
export const useDebouncedValue = <TValue>(
  value: TValue,
  delayMs = 180
): TValue => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebounced(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debounced;
};
