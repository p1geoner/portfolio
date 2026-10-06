import type { ReactElement } from 'react';

import { OG_FONT_FAMILY } from './ogFonts';

export type IOgCardProps = {
  eyebrow: string;
  title: string;
  description?: string;
  footerPrimary: string;
  footerSecondary: string;
  tags?: readonly string[];
};

/**
 * Шаблон OG-картинки. Рендерится Satori, поэтому только простые
 * flex-раскладки и инлайновые стили — grid и внешний CSS здесь не работают.
 */
export const OgCard = ({
  eyebrow,
  title,
  description,
  footerPrimary,
  footerSecondary,
  tags = [],
}: IOgCardProps): ReactElement => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
      padding: '64px 72px',
      backgroundColor: '#faf9f7',
      backgroundImage:
        'radial-gradient(circle at 88% 8%, rgba(194,65,12,0.10) 0%, rgba(250,249,247,0) 45%)',
      fontFamily: OG_FONT_FAMILY,
      color: '#14130f',
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontSize: 22,
          letterSpacing: 4,
          textTransform: 'uppercase',
          color: '#c2410c',
        }}
      >
        <div
          style={{
            width: 40,
            height: 3,
            backgroundColor: '#c2410c',
            display: 'flex',
          }}
        />
        {eyebrow}
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: 28,
          fontSize: title.length > 52 ? 60 : 72,
          fontWeight: 600,
          lineHeight: 1.06,
          letterSpacing: -1.6,
          maxWidth: 980,
        }}
      >
        {title}
      </div>

      {description ? (
        <div
          style={{
            display: 'flex',
            marginTop: 24,
            fontSize: 28,
            lineHeight: 1.4,
            color: '#3d3a34',
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      ) : null}
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {tags.length > 0 ? (
        <div style={{ display: 'flex', gap: 12 }}>
          {tags.slice(0, 5).map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '8px 18px',
                borderRadius: 999,
                border: '1px solid #cdc7bc',
                fontSize: 22,
                color: '#3d3a34',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #e2ded6',
          paddingTop: 24,
          fontSize: 26,
        }}
      >
        <div style={{ display: 'flex', fontWeight: 600 }}>{footerPrimary}</div>
        <div style={{ display: 'flex', color: '#6f6a61' }}>
          {footerSecondary}
        </div>
      </div>
    </div>
  </div>
);
