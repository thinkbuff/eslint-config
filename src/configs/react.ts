import ReactPlugin from 'eslint-plugin-react';
import ReactHookPlugin from 'eslint-plugin-react-hooks';
import JsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import { GLOB_JSX, GLOB_TSX } from '../globs';
import type { ESLintFlatConfig, RulesRecord } from '../types';

export interface ReactOptions {
  /**
   * An array of glob patterns indicating the files that the configuration object should apply to. If not specified, the configuration object applies to all files
   */
  files?: ESLintFlatConfig['files'];
  /**
   * Enable eslint-plugin-jsx-ally
   *
   * @default 'recommend'
   */
  a11y?: 'recommended' | 'strict' | false;
  /**
   * Enable typescript
   */
  typescript?: boolean;
  /**
   * An object of rules to override the default rules
   */
  overrides?: Partial<RulesRecord>;
}

export async function react(options: ReactOptions = {}): Promise<ESLintFlatConfig[]> {
  const {
    files = [GLOB_JSX, GLOB_TSX],
    a11y = 'recommended',
    typescript = true,
    overrides = {},
  } = options;

  const rules = {
    ...ReactPlugin.configs.recommended.rules,
    ...ReactHookPlugin.configs.recommended.rules,
    ...(a11y ? JsxA11yPlugin.configs[a11y].rules : {}),
  };

  return [
    {
      name: 'thinkbuff:react:setup',
      files,
      plugins: {
        'react': ReactPlugin,
        'react-hooks': ReactHookPlugin,
        ...(a11y ? { 'jsx-a11y': JsxA11yPlugin } : {}),
      },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      rules: {
        ...rules,
        'react/no-unsafe': 'off',
        'react/react-in-jsx-scope': 'off',
        ...typescript
          ? {
              'react/jsx-no-undef': 'off',
              'react/prop-type': 'off',
            }
          : {},
        ...overrides,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ];
}
