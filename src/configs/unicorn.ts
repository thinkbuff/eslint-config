import type { RuleOptions } from '@eslint-types/unicorn/types';

import { UnicornPlugin } from '../plugins';
import type { ESLintFlatConfig } from '../types';

export type UnicornRules = RuleOptions;

export async function unicorn(): Promise<ESLintFlatConfig<UnicornRules>[]> {
  const rules = UnicornPlugin.configs['flat/recommended'].rules;
  return [
    {
      name: 'thinkbuff:unicorn',
      ...UnicornPlugin.configs['flat/recommended'],
      rules: {
        ...rules,
        'unicorn/prevent-abbreviations': 'off',
        'unicorn/no-null': 'off',
      },
    },
  ];
}
