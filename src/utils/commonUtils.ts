import type { ConstructorOf, Nil, Nullable } from './utility-types';

export function isNil<T>(value: Nullable<T>): value is Nil {
  return value === null || value === undefined;
}

export function hasSome<T>(value: unknown): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function isSomeFunction<Fn extends (...args: unknown[]) => unknown>(value: unknown): value is NonNullable<Fn> {
  return hasSome<Fn>(value) && typeof value === 'function';
}

export function assertIsNonNullable<T>(value: unknown, errorMessage?: string): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage ?? `Nullish assertion Error`);
  }
}

export function assertIsInstanceOf<T>(elemType: ConstructorOf<T>, value: unknown): asserts value is T {
  assertIsNonNullable(value, `#${String(elemType)}`);
  if (!(value instanceof elemType)) {
    throw new Error(`Not expected value: ${String(value)} of type: "${String(elemType)}"`);
  }
}

export function isInstanceOf<T>(elemType: ConstructorOf<T>, value: unknown): value is T {
  return value instanceof elemType;
}

export const noop = (..._: unknown[]): undefined => {
  /** This is intentional */
};

export const identity = <T>(source: T): T => source;

/**
 * @description Return shuffled array.
 * @param {Array} arr
 */
export const toShuffledArray = <T>(arr: T[]): T[] => {
  const result = [];
  let j;
  let x;
  let index;
  for (index = arr.length - 1; index > 0; index -= 1) {
    j = Math.floor(Math.random() * (index + 1));
    x = arr[index];
    result[index] = arr[j];
    result[j] = x;
  }
  return result;
};

export const randomInt = (min: number, max: number): number =>
  // min and max included
  Math.floor(Math.random() * (max - min + 1) + min);

export function sleep(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
