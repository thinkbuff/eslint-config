import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

export async function pnpm(): Promise<ESLintFlatConfig[]> {
  const [
    PNPMPlugin,
    YAMLParser,
    JSONCParser,
  ] = await Promise.all([
    resolveModule(import('eslint-plugin-pnpm')),
    resolveModule(import('yaml-eslint-parser')),
    resolveModule(import('jsonc-eslint-parser')),
  ]);

  return [
    {
      name: 'thinkbuff:pnpm:package-json',
      files: [
        'package.json',
        '**/package.json',
      ],
      languageOptions: {
        parser: JSONCParser,
      },
      plugins: {
        pnpm: PNPMPlugin,
      },
      rules: {
        'pnpm/json-enforce-catalog': 'error',
        'pnpm/json-prefer-workspace-settings': 'error',
        'pnpm/json-valid-catalog': 'error',
      },
    },
    {
      name: 'thinkbuff:pnpm:pnpm-workspace-yaml',
      files: ['pnpm-workspace.yaml'],
      languageOptions: {
        parser: YAMLParser,
      },
      plugins: {
        pnpm: PNPMPlugin,
      },
      rules: {
        'pnpm/yaml-no-duplicate-catalog-item': 'error',
        'pnpm/yaml-no-unused-catalog-item': 'error',
      },
    },
  ];
}
