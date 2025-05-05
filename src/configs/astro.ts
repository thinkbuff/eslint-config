import { GLOB_ASTRO } from '../globs';
import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

import type { StylisticOptions } from './stylistic';

export interface AstroOptions {
  /**
   * An array of glob patterns indicating the files that the configuration object should apply to. If not specified, the configuration object applies to all files
   */
  files?: ESLintFlatConfig['files'];
  /**
   * Enable eslint-plugin-jsx-ally
   *
   * @default false
   *
   * @see [eslint-plugin-astro#a11y-extension-rules](https://ota-meshi.github.io/eslint-plugin-astro/rules/#a11y-extension-rules)
   */
  a11y?: 'recommended' | 'strict' | false;
  /**
   * Enable eslint-plugin-stylistic
   *
   * @default true
   */
  stylistic?: boolean | StylisticOptions;
  /**
   * @default {}
   */
  overrides?: ESLintFlatConfig['rules'];
};

export async function astro(
  options: AstroOptions = {},
): Promise<ESLintFlatConfig[]> {
  const {
    a11y = false,
    files = [GLOB_ASTRO],
    overrides = {},
    stylistic = true,
  } = options;

  const AstroPlugin = await resolveModule(import('eslint-plugin-astro'));

  const configs: ESLintFlatConfig[] = [
    ...AstroPlugin.configs['flat/recommended'],
    ...(a11y
      ? AstroPlugin.configs['flat/jsx-a11y-recommended']
      : []
    ),
  ].map(config => ({
    ...config,
    name: `thinkbuff:${config.name}`,
  }));

  return [
    ...configs,
    {
      name: 'thinkbuff:astro:rules',
      files,
      rules: {
        ...stylistic
          ? {
              '@stylistic/indent': 'off',
              '@stylistic/jsx-closing-tag-location': 'off',
              '@stylistic/jsx-indent': 'off',
              '@stylistic/jsx-one-expression-per-line': 'off',
              '@stylistic/no-multiple-empty-lines': 'off',
            }
          : {},
        ...overrides,
      },
    },
  ];
}
