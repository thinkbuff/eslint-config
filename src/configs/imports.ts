import type { RuleOptions as ImportRuleOptions } from '@eslint-types/import/types';

import type { ESLintFlatConfig } from '../types';
import { ImportPlugin } from '../plugins';

export type ImportRules = ImportRuleOptions;

export async function imports(): Promise<ESLintFlatConfig<ImportRules>[]> {
  return [
    {
      name: 'thinkbuff:imports',
      plugins: {
        import: ImportPlugin,
      },
      rules: {
        'import/first': 'error',
        'import/no-default-export': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            'groups': [
              ['builtin', 'external', 'internal'],
              'parent',
              ['sibling', 'index'],
              'object',
            ],
            'pathGroups': [{ group: 'internal', pattern: '{{#,~}/,#}**' }],
            'pathGroupsExcludedImportTypes': ['type'],
          },
        ],
      } as unknown as Partial<ImportRules>,
    },
    {
      name: 'thinkbuff:imports:overrides',
      files: ['**/*.config.*', '**/*.d.ts'],
      rules: {
        'import/no-default-export': 'off',
      } as unknown as Partial<ImportRules>,
    },
  ];
}
