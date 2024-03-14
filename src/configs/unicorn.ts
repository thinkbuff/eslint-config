import type { RuleOptions } from '@eslint-types/unicorn/types';

import { UnicornPlugin } from '../plugins';
import type { ESLintFlatConfig } from '../types';

export type UnicornRules = RuleOptions;

export async function unicorn(): Promise<ESLintFlatConfig<UnicornRules>[]> {
  return [
    {
      name: 'thinkbuff:unicorn',
      ...UnicornPlugin.configs['flat/recommended'],
    },
  ];
}
