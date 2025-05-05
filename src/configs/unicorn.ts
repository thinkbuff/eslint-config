import UnicornPlugin from 'eslint-plugin-unicorn';

import type { ESLintFlatConfig } from '../types';

export async function unicorn(): Promise<ESLintFlatConfig[]> {
  const rules = UnicornPlugin.configs.recommended.rules;
  return [
    {
      ...UnicornPlugin.configs.recommended,
      name: 'thinkbuff:unicorn',
      rules: {
        ...rules,
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
        'unicorn/better-regex': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/no-array-reduce': 'off',
        'unicorn/no-null': 'off',
        'unicorn/prefer-add-event-listener': 'off',
        'unicorn/prefer-native-coercion-functions': 'off',
        'unicorn/prevent-abbreviations': 'off',
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
