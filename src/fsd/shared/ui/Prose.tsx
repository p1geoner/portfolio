import clsx from 'clsx';

type ProseProps = {
  paragraphs: readonly string[];
  className?: string;
  size?: 'md' | 'lg';
};

/** Абзацы приходят массивом строк из конфигов — разметки в контенте нет. */
export const Prose = ({ paragraphs, className, size = 'md' }: ProseProps) => (
  <div
    className={clsx(
      'flex flex-col gap-4 text-[var(--text-secondary)]',
      size === 'lg' ? 'text-base md:text-lg' : 'text-base',
      className
    )}
  >
    {paragraphs.map((paragraph) => (
      <p key={paragraph.slice(0, 48)} className='leading-relaxed'>
        {paragraph}
      </p>
    ))}
  </div>
);

type BulletListProps = {
  items: readonly string[];
  className?: string;
};

export const BulletList = ({ items, className }: BulletListProps) => (
  <ul className={clsx('flex flex-col gap-3', className)}>
    {items.map((item) => (
      <li
        key={item.slice(0, 48)}
        className='relative pl-6 leading-relaxed text-[var(--text-secondary)]'
      >
        <span
          aria-hidden='true'
          className='absolute top-[0.6em] left-0 h-1.5 w-1.5 rounded-full bg-[var(--brand)]'
        />
        {item}
      </li>
    ))}
  </ul>
);
