/**
 * Расстояние Дамерау — Левенштейна с ограничением сверху.
 * Ограничение позволяет выйти раньше: для подсказок «возможно, вы имели в виду»
 * достаточно знать, что расстояние не больше 1–2, а точное значение не нужно.
 * Возвращает maxDistance + 1, если расстояние заведомо больше предела.
 */
export const boundedEditDistance = (
  source: string,
  target: string,
  maxDistance: number
): number => {
  if (source === target) {
    return 0;
  }

  if (Math.abs(source.length - target.length) > maxDistance) {
    return maxDistance + 1;
  }

  const sourceLength = source.length;
  const targetLength = target.length;

  let previousPrevious = new Array<number>(targetLength + 1).fill(0);
  let previous = new Array<number>(targetLength + 1);
  let current = new Array<number>(targetLength + 1);

  for (let column = 0; column <= targetLength; column += 1) {
    previous[column] = column;
  }

  for (let row = 1; row <= sourceLength; row += 1) {
    current[0] = row;
    let rowMinimum = current[0] as number;

    for (let column = 1; column <= targetLength; column += 1) {
      const substitutionCost = source[row - 1] === target[column - 1] ? 0 : 1;

      let value = Math.min(
        (previous[column] as number) + 1,
        (current[column - 1] as number) + 1,
        (previous[column - 1] as number) + substitutionCost
      );

      const isTransposition =
        row > 1 &&
        column > 1 &&
        source[row - 1] === target[column - 2] &&
        source[row - 2] === target[column - 1];

      if (isTransposition) {
        value = Math.min(value, (previousPrevious[column - 2] as number) + 1);
      }

      current[column] = value;
      rowMinimum = Math.min(rowMinimum, value);
    }

    // Если вся строка уже дальше предела, дальше будет только хуже.
    if (rowMinimum > maxDistance) {
      return maxDistance + 1;
    }

    previousPrevious = previous;
    previous = current;
    current = new Array<number>(targetLength + 1);
  }

  const distance = previous[targetLength] as number;

  return distance > maxDistance ? maxDistance + 1 : distance;
};
