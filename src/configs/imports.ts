import type { RuleOptions as ImportRuleOptions } from '@eslint-types/import/types';

import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
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
      name: 'thinkbuff:imports:disable-no-default-export',
      plugins: {
        import: ImportPlugin,
      },
      files: [
        `**/*config*.${GLOB_SRC_EXT}`,
        `**/{views,pages,routes,middleware,plugins,api}/${GLOB_SRC}`,
        `**/{index,vite,esbuild,rollup,rolldown,webpack,rspack}.ts`,
        '**/*.d.ts',
      ],
      rules: {
        'import/no-default-export': 'off',
      } as unknown as Partial<ImportRules>,
    },
  ];
}
