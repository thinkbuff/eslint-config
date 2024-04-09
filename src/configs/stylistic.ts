import type { StylisticCustomizeOptions, RuleOptions } from '@stylistic/eslint-plugin';

import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

export type StylisticRules = RuleOptions;

export interface StylisticOptions extends Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'> {
  overrides?: Partial<StylisticRules>;
}

const DefaultStylisticOptions: StylisticOptions = {
  braceStyle: '1tbs',
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: true,
};

export async function stylistic(options: StylisticOptions = {}): Promise<ESLintFlatConfig<StylisticRules>[]> {
  const { overrides = {}, ...customizeOptions } = {
    ...DefaultStylisticOptions,
    ...options,
  };

  const StylisticPlugin = await resolveModule(import('@stylistic/eslint-plugin'));

  const config = StylisticPlugin.configs.customize({
    flat: true,
    ...customizeOptions,
  });

  return [
    {
      name: 'thinkbuff:stylistic',
      plugins: {
        '@stylistic': StylisticPlugin,
      },
      rules: {
        ...config.rules,
        '@stylistic/multiline-ternary': [
          'error',
          'always-multiline',
          {
            ignoreJSX: true,
          },
        ],
        ...overrides,
      },
    },
  ] as ESLintFlatConfig<StylisticRules>[];
}
