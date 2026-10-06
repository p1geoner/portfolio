import { notFound } from 'next/navigation';

/**
 * Любой неизвестный путь внутри локали отдаёт локализованную 404-страницу,
 * а не глобальную без языка и без общего каркаса.
 */
const CatchAllPage = (): never => {
  notFound();
};

export default CatchAllPage;
