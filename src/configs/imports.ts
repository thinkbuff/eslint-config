import * as ImportPlugin from 'eslint-plugin-import-x';

import { GLOB_SRC, GLOB_SRC_EXT } from '../globs';
import type { ESLintFlatConfig } from '../types';

export async function imports(): Promise<ESLintFlatConfig[]> {
  return [
    {
      name: 'thinkbuff:imports',
      plugins: {
        import: ImportPlugin,
      },
      rules: {
        'import/no-named-default': 'error',
        'import/first': 'error',
        'import/newline-after-import': ['error', { count: 1 }],
        'import/no-default-export': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',
        'import/order': [
          'error',
          {
            'groups': [
              ['builtin', 'external'],
              ['internal'],
              'parent',
              ['sibling', 'index'],
              'object',
            ],
            'newlines-between': 'always',
            'pathGroups': [{ group: 'internal', pattern: '{{#,~}/,#}**' }],
            'pathGroupsExcludedImportTypes': ['type'],
          },
        ],
      },
    },
    {
      name: 'thinkbuff:imports:disable-no-default-export',
      files: [
        `**/*config*.${GLOB_SRC_EXT}`,
        `**/{views,pages,routes,middleware,plugins,api}/${GLOB_SRC}`,
        '**/{index,vite,esbuild,rollup,rolldown,webpack,rspack}.ts',
        '**/*.d.ts',
        '**/.storybook/*.@(ts|tsx|js|jsx|mjs|cjs)',
        '**/*.@(stories|story).@(ts|tsx|js|jsx|mjs|cjs)',
      ],
      plugins: {
        import: ImportPlugin,
      },
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ];
}
