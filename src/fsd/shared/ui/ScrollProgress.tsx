/**
 * Индикатор прочитанного. Работает на CSS scroll-driven анимации, то есть
 * без обработчиков scroll и без JavaScript вообще. В браузерах без поддержки
 * animation-timeline полоса просто не показывается — контент не страдает.
 */
export const ScrollProgress = () => (
  <div
    aria-hidden='true'
    className='scrollProgress pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[var(--brand)]'
  />
);
