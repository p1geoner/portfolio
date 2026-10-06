import type { PropsWithChildren } from 'react';

/** Текст для скринридеров: остаётся в потоке, но не занимает места. */
export const VisuallyHidden = ({ children }: PropsWithChildren) => (
  <span className='sr-only'>{children}</span>
);
