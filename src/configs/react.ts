import { GLOB_JSX, GLOB_TSX } from '../globs';
import type { ESLintFlatConfig, RulesRecord } from '../types';
import { resolveModule } from '../utils';

export interface ReactOptions {
  /**
   * An array of glob patterns indicating the files that the configuration object should apply to. If not specified, the configuration object applies to all files
   *
   */
  files?: ESLintFlatConfig['files'];
  /**
   * Enable eslint-plugin-jsx-ally
   *
   * @default false
   */
  a11y?: 'recommended' | 'strict' | false;
  /**
   * Enable typescript
   *
   * @default true
   */
  typescript?: boolean;
  /**
   * An object of rules to override the default rules
   *
   * @default {}
   */
  overrides?: Partial<RulesRecord>;
}

export async function react(options: ReactOptions = {}): Promise<ESLintFlatConfig[]> {
  const {
    files = [GLOB_JSX, GLOB_TSX],
    a11y = false,
    typescript = true,
    overrides = {},
  } = options;

  const [ReactPlugin, ReactHookPlugin, JsxA11yPlugin] = await Promise.all([
    resolveModule(import('eslint-plugin-react')),
    resolveModule(import('eslint-plugin-react-hooks')),
    a11y ? resolveModule(import('eslint-plugin-jsx-a11y')) : undefined,
  ]);

  const rules = {
    ...ReactPlugin.configs.recommended.rules,
    ...ReactHookPlugin.configs.recommended.rules,
    ...(a11y && JsxA11yPlugin
      ? JsxA11yPlugin.configs[a11y].rules
      : {}),
  };

  return [
    {
      name: 'thinkbuff:react:setup',
      files,
      plugins: {
        'react': ReactPlugin,
        'react-hooks': ReactHookPlugin,
        ...(a11y && JsxA11yPlugin
          ? { 'jsx-a11y': JsxA11yPlugin }
          : {}),
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
