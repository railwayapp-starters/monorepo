export const rand = (min = 0, max = 1): number =>
  Math.random() * (max - min) + min;

export const randItem = <T>(arr: T[]): T => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

export const clamp = (n: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, n));
