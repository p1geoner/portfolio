import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

export const ArrowRightIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M3 8h10M9 4l4 4-4 4' />
  </svg>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M13 8H3M7 4L3 8l4 4' />
  </svg>
);

export const ArrowUpIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M8 13V3M4 7l4-4 4 4' />
  </svg>
);

export const ExternalIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M6.5 3H3v10h10V9.5M9.5 2.5h4v4M13 3L7.5 8.5' />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx='7' cy='7' r='4' />
    <path d='M10 10l3 3' />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M4 4l8 8M12 4l-8 8' />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M3 8.5L6 11.5 13 4.5' />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x='5.5' y='5.5' width='8' height='8' rx='1.5' />
    <path d='M10.5 5.5v-1a1.5 1.5 0 0 0-1.5-1.5H4a1.5 1.5 0 0 0-1.5 1.5v5A1.5 1.5 0 0 0 4 11' />
  </svg>
);

export const SunIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <circle cx='8' cy='8' r='3' />
    <path d='M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M12.6 3.4l-1 1M4.4 11.6l-1 1' />
  </svg>
);

export const MoonIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5z' />
  </svg>
);

export const LockIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x='3.5' y='7' width='9' height='6.5' rx='1.5' />
    <path d='M5.5 7V5a2.5 2.5 0 0 1 5 0v2' />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <rect x='2' y='3.5' width='12' height='9' rx='1.5' />
    <path d='M2.5 4.5L8 9l5.5-4.5' />
  </svg>
);

export const TelegramIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M14 3L2 7.5l3.5 1.2L14 3zM5.5 8.7l.4 3.8 2-2.2L14 3' />
  </svg>
);

export const GithubIcon = (props: IconProps) => (
  <svg {...base({ ...props, strokeWidth: 1.2 })}>
    <path d='M6 13.5c-2.6.8-2.6-1.6-3.6-1.9M10 14v-2.2c0-.7.1-1-.4-1.4 1.9-.2 3.1-1 3.1-3.4a2.7 2.7 0 0 0-.7-1.9 2.4 2.4 0 0 0-.1-1.9s-.8-.2-2.2.8a5.6 5.6 0 0 0-2.9 0C5.4 2.1 4.6 2.3 4.6 2.3a2.4 2.4 0 0 0-.1 1.9 2.7 2.7 0 0 0-.7 1.9c0 2.4 1.2 3.2 3.1 3.4-.5.4-.5.9-.4 1.4V14' />
  </svg>
);

export const PhoneIcon = (props: IconProps) => (
  <svg {...base(props)}>
    <path d='M5 2.5H3.5A1 1 0 0 0 2.5 3.6C2.8 8 8 13.2 12.4 13.5a1 1 0 0 0 1.1-1V11l-3-1-1.2 1.4A9 9 0 0 1 5.6 7.7L7 6.5 6 3.5z' />
  </svg>
);
