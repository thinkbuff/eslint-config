import globals from 'globals';

import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
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
      files: [`scripts/${GLOB_SRC}`, `cli.${GLOB_SRC_EXT}`],
      rules: {
        'no-console': 'off',
      },
    },
  ];
}
