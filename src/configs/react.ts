import { isPackageExists } from 'local-pkg';

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

const ReactRefreshAllowConstantExportPackages = ['vite'];

export async function react(options: ReactOptions = {}): Promise<ESLintFlatConfig[]> {
  const { typescript = true, a11y = false, files = [GLOB_JSX, GLOB_TSX], overrides = {} } = options;

  const [ReactPlugin, ReactHookPlugin, ReactRefreshPlugin, JsxA11yPlugin] = await Promise.all([
    resolveModule(import('@eslint-react/eslint-plugin')),
    resolveModule(import('eslint-plugin-react-hooks')),
    resolveModule(import('eslint-plugin-react-refresh')),
    a11y ? resolveModule(import('eslint-plugin-jsx-a11y')) : undefined,
  ]);

  const isAllowConstantExport = ReactRefreshAllowConstantExportPackages.some(i => isPackageExists(i));

  const plugins = ReactPlugin.configs.all.plugins;

  const rules = {
    ...Object.fromEntries(
      Object.entries(ReactPlugin.configs.recommended.rules).map(([name, value]) => [
        name
          .replace('@eslint-react/dom/', 'react-dom/')
          .replace('@eslint-react/web-api/', 'react-web-api/')
          .replace('@eslint-react/', 'react/'),
        value,
      ]),
    ),
    ...ReactHookPlugin.configs.recommended.rules,
    ...(a11y && JsxA11yPlugin ? JsxA11yPlugin.configs[a11y].rules : {}),
  };

  return [
    {
      name: 'thinkbuff:react:setup',
      files,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        'react': plugins['@eslint-react'],
        'react-dom': plugins['@eslint-react/dom'],
        'react-hooks': ReactHookPlugin,
        'react-hooks-extra': plugins['@eslint-react/hooks-extra'],
        'react-naming-convention': plugins['@eslint-react/naming-convention'],
        'react-refresh': ReactRefreshPlugin,
        ...(a11y && JsxA11yPlugin ? { 'jsx-a11y': JsxA11yPlugin } : {}),
      },
      rules: {
        ...rules,
        'react/no-unsafe': 'off',
        'react/react-in-jsx-scope': 'off',
        // react refresh
        'react-refresh/only-export-components': ['warn', { allowConstantExport: isAllowConstantExport }],
        ...(typescript
          ? {
              'react/prop-type': 'off',
              'react/jsx-no-undef': 'off',
            }
          : {}),
        ...overrides,
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
    {
      name: 'thinkbuff:react:disable-rules-of-hooks',
      files: ['**/.storybook/*.@(ts|tsx|js|jsx|mjs|cjs)', '**/*.@(stories|story).@(ts|tsx|js|jsx|mjs|cjs)'],
      plugins: {
        'react-hooks': ReactHookPlugin,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
  ];
}
