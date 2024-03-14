import globals from 'globals';

import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

export async function files(): Promise<ESLintFlatConfig[]> {
  const TsParser = await resolveModule(import('@typescript-eslint/parser'));

  return [
    {
      name: 'thinkbuff:files:setup',
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
      name: 'thinkbuff:files:js',
      files: ['**/*.{js,cjs,mjs}'],
    },
    {
      name: 'thinkbuff:files:jsx',
      files: ['**/*.jsx'],
    },
    {
      name: 'thinkbuff:files:ts',
      files: ['**/*.ts'],
      languageOptions: {
        parser: TsParser,
        parserOptions: {
          sourceType: 'module',
        },
        sourceType: 'module',
      },

    },
    {
      name: 'thinkbuff:files:tsx',
      files: ['**/*.tsx'],
      languageOptions: {
        parser: TsParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: 'module',
        },
        sourceType: 'module',
      },
    },
  ];
}
