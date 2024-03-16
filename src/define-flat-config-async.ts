import {
  ignores,
  files,
  astro,
  stylistic,
  unicorn,
  unocss,
  imports,
  type StylisticOptions,
  type AstroOptions,
  type StylisticRules,
  type AstroRules,
  type UnicornRules,
  type UnocssOptions,
  type UnocssRules,
  type ImportRules,
} from './configs';
import type { Awaitable, ESLintFlatConfig, RulesRecord } from './types';
import { resolveOptions } from './utils';

export type Rules = RulesRecord | StylisticRules | AstroRules | UnicornRules | UnocssRules | ImportRules;

export interface DefineFlatConfigAsyncOptions {
  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * Enable astro rules.
   *
   * Requires installing:
   * - `eslint-plugin-astro`
   * - `eslint-plugin-jsx-a11y`
   *
   * @default false
   */
  astro?: boolean | AstroOptions;
  /**
   * Enable unocss rules.
   *
   * Requires installing:
   * - `@unocss/eslint-plugin`
   *
   * @default false
   */
  unocss?: boolean | UnocssOptions;
}

/**
 * Defines a flat configuration asynchronously by merging different ESLint configurations.
 *
 * @param options - optional options to customize the configuration
 * @param merges - additional ESLint configurations to merge
 * @return a Promise that resolves to a flat ESLint configuration
 */
export async function defineFlatConfigAsync(
  options: DefineFlatConfigAsyncOptions = {},
  ...merges: Awaitable<ESLintFlatConfig<Rules>>[]
) {
  const promises: Awaitable<ESLintFlatConfig<Rules>[]>[] = [ignores(), files(), unicorn(), imports()];

  const stylisticOptions = resolveOptions(options.stylistic, {});

  if (stylisticOptions) {
    promises.push(stylistic(stylisticOptions));
  }

  if (options.astro) {
    promises.push(astro(resolveOptions(options.astro, { stylistic: stylisticOptions })));
  }

  if (options.unocss) {
    promises.push(unocss(resolveOptions(options.unocss)));
  }

  const configs = await Promise.all([...promises, ...merges]);

  return configs.flat();
}
