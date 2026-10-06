import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  skillId: string;
};

const base = (props: Omit<IconProps, 'skillId'>) => ({
  width: 14,
  height: 14,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
  ...props,
});

const Glyph = ({ skillId, ...props }: IconProps) => {
  const attrs = base(props);

  switch (skillId) {
    case 'react':
    case 'react-router':
      return (
        <svg {...attrs}>
          <circle cx='8' cy='8' r='1.4' fill='currentColor' stroke='none' />
          <ellipse cx='8' cy='8' rx='6.5' ry='2.4' />
          <ellipse cx='8' cy='8' rx='6.5' ry='2.4' transform='rotate(60 8 8)' />
          <ellipse
            cx='8'
            cy='8'
            rx='6.5'
            ry='2.4'
            transform='rotate(120 8 8)'
          />
        </svg>
      );
    case 'nextjs':
    case 'app-router':
      return (
        <svg {...attrs}>
          <circle cx='8' cy='8' r='6' />
          <path
            d='M6 5.5h1.8L10 10.5V5.5h1.5v6H9.6L7.4 6.5v5H5.9z'
            fill='currentColor'
            stroke='none'
          />
        </svg>
      );
    case 'typescript':
    case 'javascript':
      return (
        <svg {...attrs}>
          <rect x='2.5' y='2.5' width='11' height='11' rx='1.5' />
          <path d='M5 10.5V6.2h1.4v4.3zm3.2 0V8.1c0-.7.4-1.1 1.1-1.1.6 0 1 .3 1 .9v2.6' />
        </svg>
      );
    case 'mobx':
    case 'zustand':
    case 'redux-toolkit':
      return (
        <svg {...attrs}>
          <path d='M3.5 8c0-2.5 2-4.5 4.5-4.5S12.5 5.5 12.5 8' />
          <path d='M12.5 8c0 2.5-2 4.5-4.5 4.5S3.5 10.5 3.5 8' />
          <circle cx='8' cy='8' r='1.5' fill='currentColor' stroke='none' />
        </svg>
      );
    case 'scss':
    case 'css':
    case 'tailwind':
      return (
        <svg {...attrs}>
          <path d='M3 4.5h10M4.5 8h7M6 11.5h4' />
        </svg>
      );
    case 'html':
      return (
        <svg {...attrs}>
          <path d='M3.5 3.5h9l-.8 9L8 14l-3.7-1.5z' />
          <path d='M5.5 6h5M5.8 9h4.4' />
        </svg>
      );
    case 'git':
      return (
        <svg {...attrs}>
          <circle cx='5' cy='11' r='1.5' />
          <circle cx='11' cy='5' r='1.5' />
          <circle cx='11' cy='11' r='1.5' />
          <path d='M5 9.5V5.5h4.5M11 6.5v3' />
        </svg>
      );
    case 'rest-api':
    case 'graphql':
      return (
        <svg {...attrs}>
          <path d='M3 8h10M8 3v10' />
          <circle cx='8' cy='8' r='2.2' />
        </svg>
      );
    case 'fsd':
    case 'feature-sliced':
      return (
        <svg {...attrs}>
          <rect x='2.5' y='3' width='11' height='2.2' rx='0.6' />
          <rect x='2.5' y='6.9' width='11' height='2.2' rx='0.6' />
          <rect x='2.5' y='10.8' width='11' height='2.2' rx='0.6' />
        </svg>
      );
    case 'electron':
      return (
        <svg {...attrs}>
          <ellipse cx='8' cy='8' rx='6.5' ry='2.6' />
          <ellipse cx='8' cy='8' rx='6.5' ry='2.6' transform='rotate(60 8 8)' />
          <circle cx='8' cy='8' r='1.3' fill='currentColor' stroke='none' />
        </svg>
      );
    case 'tanstack-query':
    case 'tanstack-router':
      return (
        <svg {...attrs}>
          <path d='M3 11.5 8 3.5l5 8H3z' />
        </svg>
      );
    case 'nestjs':
      return (
        <svg {...attrs}>
          <path d='M8 2.5c2.5 0 5 1.8 5 5.2 0 3.2-2.2 5.3-5 6.3-2.8-1-5-3.1-5-6.3C3 4.3 5.5 2.5 8 2.5z' />
        </svg>
      );
    case 'antd':
    case 'mui':
      return (
        <svg {...attrs}>
          <rect x='3' y='3' width='4.5' height='4.5' rx='0.8' />
          <rect x='8.5' y='3' width='4.5' height='4.5' rx='0.8' />
          <rect x='3' y='8.5' width='4.5' height='4.5' rx='0.8' />
          <rect x='8.5' y='8.5' width='4.5' height='4.5' rx='0.8' />
        </svg>
      );
    default:
      return (
        <svg {...attrs}>
          <circle cx='8' cy='8' r='6' />
          <text
            x='8'
            y='11'
            textAnchor='middle'
            fill='currentColor'
            stroke='none'
            fontSize='7'
            fontFamily='var(--font-mono)'
          >
            {skillId.charAt(0).toUpperCase()}
          </text>
        </svg>
      );
  }
};

/** Компактная mono-иконка технологии; неизвестные id — буква. */
export const SkillIcon = (props: IconProps) => <Glyph {...props} />;
