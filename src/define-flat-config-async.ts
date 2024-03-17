import { isPackageExists } from 'local-pkg';

import {
  ignores,
  astro,
  stylistic,
  unicorn,
  unocss,
  imports,
  javascript,
  typescript,
  type StylisticOptions,
  type AstroOptions,
  type StylisticRules,
  type AstroRules,
  type UnicornRules,
  type UnocssOptions,
  type UnocssRules,
  type ImportRules,
  type TypescriptOptions,
  type TypescriptESlintRules,
  perfectionist,
} from './configs';
import type { Awaitable, ESLintFlatConfig, RulesRecord } from './types';
import { resolveOptions } from './utils';

export type Rules =
  | RulesRecord
  | StylisticRules
  | TypescriptESlintRules
  | AstroRules
  | UnicornRules
  | UnocssRules
  | ImportRules;

export interface DefineFlatConfigAsyncOptions {
  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | TypescriptOptions;
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
  /**
   * perfectionist plugin for props and items sorting.
   *
   * @see https://github.com/azat-io/eslint-plugin-perfectionist
   *
   * @default true,
   */
  perfectionist?: boolean;
  /**
   * Additional ESlint Flat configuration.
   *
   * @default []
   */
  extends?: Awaitable<ESLintFlatConfig<Rules>>[];
}

/**
 * Defines a flat configuration asynchronously by merging different ESLint configurations.
 *
 * @param options - optional options to customize the configuration
 * @return a Promise that resolves to a flat ESLint configuration
 */
export async function defineFlatConfigAsync(options: DefineFlatConfigAsyncOptions = {}) {
  const configs: Awaitable<ESLintFlatConfig<Rules>[]>[] = [ignores(), javascript(), unicorn(), imports()];

  const stylisticOptions = resolveOptions(options.stylistic, {});

  if (stylisticOptions) {
    configs.push(stylistic(stylisticOptions));
  }

  if (options.typescript !== false && isPackageExists('typescript')) {
    configs.push(typescript(resolveOptions(options.typescript)));
  }

  if (options.astro) {
    configs.push(astro(resolveOptions(options.astro, { stylistic: stylisticOptions })));
  }

  if (options.unocss) {
    configs.push(unocss(resolveOptions(options.unocss)));
  }

  if (options.perfectionist !== false) {
    configs.push(perfectionist());
  }

  const values = await Promise.all([...configs, ...(Array.isArray(options.extends) ? options.extends : [])]);

  return values.flat();
}
