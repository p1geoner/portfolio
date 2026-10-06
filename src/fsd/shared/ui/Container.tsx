import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

type ContainerProps = PropsWithChildren<{
  className?: string;
  as?: 'div' | 'header' | 'footer' | 'section' | 'nav' | 'main';
}>;

export const Container = ({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) => (
  <Tag className={clsx('container-page', className)}>{children}</Tag>
);
