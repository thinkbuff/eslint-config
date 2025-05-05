import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin';

import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

export interface StylisticOptions extends Omit<StylisticCustomizeOptions, 'flat' | 'pluginName'> {
  overrides?: ESLintFlatConfig['rules'];
}

const DefaultStylisticOptions: StylisticOptions = {
  braceStyle: '1tbs',
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: true,
};

export async function stylistic(options: StylisticOptions = {}): Promise<ESLintFlatConfig[]> {
  const { overrides = {}, ...customizeOptions } = {
    ...DefaultStylisticOptions,
    ...options,
  };

  const StylisticPlugin = await resolveModule(import('@stylistic/eslint-plugin'));

  const config = StylisticPlugin.configs.customize({
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
  ];
}
