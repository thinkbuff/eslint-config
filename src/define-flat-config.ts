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
import { isObject } from './utils';

type Rules = RulesRecord | StylisticRules | AstroRules | UnicornRules | UnocssRules | ImportRules;

export interface OptionsConfig {
  /**
   * Enable stylistic rules.
   *
   * @default true
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * Enable astro rules.
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

export async function defineFlatConfig(
  options: OptionsConfig = {},
  ...overrides: Awaitable<ESLintFlatConfig<Rules>>[]
) {
  const configs: Awaitable<ESLintFlatConfig<Rules>[]>[] = [ignores(), files(), unicorn(), imports()];

  const stylisticOptions = options.stylistic === false ? false : (isObject(options.stylistic) ? options.stylistic : {});

  if (stylisticOptions) {
    configs.push(stylistic(stylisticOptions));
  }

  if (options.astro) {
    configs.push(astro(isObject(options.astro) ? options.astro : { stylistic: stylisticOptions }));
  }

  if (options.unocss) {
    configs.push(unocss(isObject(options.unocss) ? options.unocss : {}));
  }

  const resolves = await Promise.all([...configs, ...overrides]);

  return resolves.flat();
}
