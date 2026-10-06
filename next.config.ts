import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/fsd/shared/i18n/request.ts');

/**
 * Content-Security-Policy без nonce: nonce уникален на каждый ответ, а значит
 * страницы пришлось бы рендерить динамически и терять статическую генерацию.
 * Для сайта без пользовательского ввода и без сторонних скриптов выгоднее
 * оставить весь HTML статикой и жёстко закрыть остальные директивы.
 * 'unsafe-inline' в script-src нужен инлайновому загрузчику Next и скрипту
 * темы; сторонние источники скриптов при этом запрещены полностью.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests',
].join('; ');

/** Заголовки, не зависящие от конкретного запроса. */
const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Внешних источников изображений нет: весь медиаконтент лежит в public.
    remotePatterns: [],
    // SVG может содержать скрипты, поэтому оптимизатор его не пропускает.
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
  },
  typescript: { ignoreBuildErrors: false },
  headers: () =>
    Promise.resolve([
      { source: '/:path*', headers: securityHeaders },
      {
        // Медиа и шрифты неизменяемы: имя файла меняется вместе с содержимым.
        source: '/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]),
};

export default withNextIntl(nextConfig);
