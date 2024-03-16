import globals from 'globals';

import type { ESLintFlatConfig } from '../types';

export async function javascript(): Promise<ESLintFlatConfig[]> {
  return [
    {
      name: 'thinkbuff:javascript',
      languageOptions: {
        ecmaVersion: 2022,
        globals: {
          ...globals.browser,
          ...globals.es2021,
          ...globals.node,
          document: 'readonly',
          navigator: 'readonly',
          window: 'readonly',
        },
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 2022,
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      linterOptions: {
        reportUnusedDisableDirectives: true,
      },
    },
    {
      name: 'thinkbuff:javascript:scripts-overrides',
      files: ['scripts/**/*.?([cm])[jt]s?(x)', 'cli.?([cm])[jt]s?(x)'],
      rules: {
        'no-console': 'off',
      },
    },
  ];
}
