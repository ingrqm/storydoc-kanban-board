type HexDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

type Hex3 = `${HexDigit}${HexDigit}${HexDigit}`;

export type HexColor<T extends string> = Lowercase<T> extends `#${Hex3}`
  ? T
  : Lowercase<T> extends `#${Hex3}${infer Rest}`
  ? Rest extends Hex3
    ? T
    : never
  : never;

export const transparency = <T extends string>(color: HexColor<T>, alpha: number, format: 'rgba' | 'hex' = 'rgba') => {
  const hexValue = color.replace('#', '');

  const hex =
    hexValue.length === 3
      ? hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2]
      : hexValue;

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (format === 'hex') {
    const hexAlpha = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0')
      .toUpperCase();

    return `#${hex}${hexAlpha}`;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
