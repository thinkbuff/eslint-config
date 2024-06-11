import type { ESLintFlatConfig, RuleEntry, RulesRecord } from '../types';
import { resolveModule } from '../utils';

import type { StylisticOptions, StylisticRules } from './stylistic';

export interface AstroBaseRules {
  'astro/no-conflict-set-directives': RuleEntry;
  'astro/no-deprecated-astro-canonicalurl': RuleEntry;
  'astro/no-deprecated-astro-fetchcontent': RuleEntry;
  'astro/no-deprecated-astro-resolve': RuleEntry;
  'astro/no-deprecated-getentrybyslug': RuleEntry;
  'astro/no-unused-define-vars-in-style': RuleEntry;
  'astro/valid-compile': RuleEntry;
  'astro/no-set-html-directive': RuleEntry;
  'astro/no-set-text-directive': RuleEntry;
  'astro/no-unused-css-selector': RuleEntry;
  'astro/prefer-class-list-directive': RuleEntry;
  'astro/prefer-object-class-list': RuleEntry;
  'astro/prefer-split-class-list': RuleEntry;
  'astro/missing-client-only-directive-value': RuleEntry;
  'astro/semi': RuleEntry;
};

export interface AstroJsxA11yRules {
  'astro/jsx-a11y/alt-text': RuleEntry;
  'astro/jsx-a11y/anchor-has-content': RuleEntry;
  'astro/jsx-a11y/anchor-is-valid': RuleEntry;
  'astro/jsx-a11y/aria-activedescendant-has-tabindex': RuleEntry;
  'astro/jsx-a11y/aria-props': RuleEntry;
  'astro/jsx-a11y/aria-proptypes': RuleEntry;
  'astro/jsx-a11y/aria-role': RuleEntry;
  'astro/jsx-a11y/aria-unsupported-elements': RuleEntry;
  'astro/jsx-a11y/autocomplete-valid': RuleEntry;
  'astro/jsx-a11y/click-events-have-key-events': RuleEntry;
  'astro/jsx-a11y/control-has-associated-label': RuleEntry;
  'astro/jsx-a11y/heading-has-content': RuleEntry;
  'astro/jsx-a11y/html-has-lang': RuleEntry;
  'astro/jsx-a11y/iframe-has-title': RuleEntry;
  'astro/jsx-a11y/img-redundant-alt': RuleEntry;
  'astro/jsx-a11y/interactive-supports-focus': RuleEntry;
  'astro/jsx-a11y/label-has-for': 'off';
  'astro/jsx-a11y/label-has-associated-control': RuleEntry;
  'astro/jsx-a11y/media-has-caption': RuleEntry;
  'astro/jsx-a11y/mouse-events-have-key-events': RuleEntry;
  'astro/jsx-a11y/no-access-key': RuleEntry;
  'astro/jsx-a11y/no-autofocus': RuleEntry;
  'astro/jsx-a11y/no-distracting-elements': RuleEntry;
  'astro/jsx-a11y/no-interactive-element-to-noninteractive-role': RuleEntry;
  'astro/jsx-a11y/no-noninteractive-element-interactions': RuleEntry;
  'astro/jsx-a11y/no-noninteractive-element-to-interactive-role': RuleEntry;
  'astro/jsx-a11y/no-noninteractive-tabindex': RuleEntry;
  'astro/jsx-a11y/no-redundant-roles': RuleEntry;
  'astro/jsx-a11y/no-static-element-interactions': RuleEntry;
  'astro/jsx-a11y/role-has-required-aria-props': RuleEntry;
  'astro/jsx-a11y/role-supports-aria-props': RuleEntry;
  'astro/jsx-a11y/scope': RuleEntry;
  'astro/jsx-a11y/tabindex-no-positive': RuleEntry;
};

export type AstroRules = AstroBaseRules & AstroJsxA11yRules;

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
  overrides?: Partial<AstroRules & StylisticRules & RulesRecord>;
};

export async function astro(
  options: AstroOptions = {},
): Promise<ESLintFlatConfig<AstroRules & StylisticRules>[]> {
  const {
    a11y = false,
    files = ['**/*.astro', '*.astro'],
    overrides = {},
    stylistic = true,
  } = options;

  const AstroPlugin = await resolveModule(import('eslint-plugin-astro'));

  const rules = {
    ...(stylistic
      ? {
          '@stylistic/jsx-indent': 'off',
          '@stylistic/jsx-one-expression-per-line': 'off',
        }
      : {}) as Partial<StylisticRules>,
  };

  const configs = [
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
        ...rules,
        ...overrides,
      },
    },
  ];
}
