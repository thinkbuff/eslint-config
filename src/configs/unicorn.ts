import type { RuleOptions } from '@eslint-types/unicorn/types';
import UnicornPlugin from 'eslint-plugin-unicorn';

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
        'unicorn/filename-case': [
          'error',
          {
            cases: { kebabCase: true },
            ignore: [
              // ignore file-based routing when use `[param]` syntax , eg: [postId].get.ts or [postId].ts
              /^\[\w+](\.*.*)?\.*.*$/,
            ],
          },
        ],
      },
    },
    {
      name: 'thinkbuff:unicorn:overrides',
      files: ['**/*.config.*'],
      rules: {
        'unicorn/prefer-top-level-await': 'off',
      },
    },
  ];
}
