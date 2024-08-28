import type { RuleOptions } from '@eslint-types/typescript-eslint/types';

import type { ESLintFlatConfig, RulesRecord } from '../types';
import { GLOB_TS, GLOB_TSX } from '../globs';
import { resolveModule } from '../utils';

export type TypescriptESlintRules = RuleOptions;

export interface TypescriptOptions {
  overrides?: Partial<TypescriptESlintRules>;
}

/**
 * Generates an ESLint configuration for TypeScript based on the provided options.
 *
 * @param options - optional options for customization
 * @return an array of ESLint configurations for TypeScript
 */
export async function typescript(options: TypescriptOptions = {}): Promise<ESLintFlatConfig<TypescriptESlintRules>[]> {
  const { overrides = {} } = options;

  const TSESLint = await resolveModule(import('typescript-eslint'));

  const rules: RulesRecord = {};
  for (const config of TSESLint.configs.recommended) {
    if (!config.rules) {
      continue;
    }

    for (const [key, value] of Object.entries(config.rules)) {
      if (!value) {
        continue;
      }
      rules[key] = value;
    }
  }

  return [
    {
      name: 'thinkbuff:typescript',
      files: [GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: TSESLint.parser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          sourceType: 'module',
        },
        sourceType: 'module',
      },
      plugins: {
        '@typescript-eslint': TSESLint.plugin,
      },
      rules: {
        ...rules,
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/consistent-type-assertions': [
          'error',
          {
            assertionStyle: 'as',
            objectLiteralTypeAssertions: 'allow-as-parameter',
          },
        ],
        '@typescript-eslint/consistent-type-imports': [
          'error',
          { disallowTypeAnnotations: false, fixStyle: 'inline-type-imports' },
        ],
        '@typescript-eslint/method-signature-style': ['error', 'property'],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/prefer-as-const': 'warn',
        '@typescript-eslint/prefer-literal-enum-member': [
          'error',
          { allowBitwiseExpressions: true },
        ],
        ...overrides,
      },
    },
    {
      name: 'thinkbuff:typescript:javascript-overrides',
      files: ['**/*.js', '**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off',
      },
    },
  ] as ESLintFlatConfig<TypescriptESlintRules>[];
}
