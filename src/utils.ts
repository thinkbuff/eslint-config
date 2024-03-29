import type { UnknownRecord } from 'type-fest';

import type { Awaitable } from './types';

export function isObject(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null;
}

/**
 * Resolves the module to extract the default export if it exists.
 *
 * @param m - The module to be resolved.
 * @return The resolved default export or the module itself.
 */
export async function resolveModule<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default || resolved;
}

/**
 * Resolves the given options, returning the resolved value or the default value if provided.
 * @param options The options to resolve. Can be a boolean or the actual options.
 * @param defaultValue The default value to return if options is falsy.
 * @returns The resolved options or the default value. Returns null if options is false.
 */
export function resolveOptions<
  T,
  DefaultOptions extends Exclude<T, boolean>,
  Result = T extends false ? false : (Exclude<T, boolean | undefined> | DefaultOptions),
>(options: T, defaultValue?: DefaultOptions): Result {
  if (typeof options === 'boolean') {
    return (options ? defaultValue : false) as Result;
  }

  return (isObject(options) ? options : (defaultValue)) as Result;
}
