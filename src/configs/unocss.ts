import type { ESLintFlatConfig, RuleEntry } from '../types';
import { resolveModule } from '../utils';

export interface UnocssRules {
  'unocss/order': RuleEntry;
  'unocss/order-attributify': RuleEntry;
  'unocss/blocklist': RuleEntry;
}

export interface UnocssOptions {
  overrides?: Partial<UnocssRules>;
}

export async function unocss(options: UnocssOptions = {}): Promise<ESLintFlatConfig<UnocssRules>[]> {
  const { overrides = {} } = options;

  const { configs } = await resolveModule(import('@unocss/eslint-plugin'));

  return [
    {
      name: 'thinkbuff:unocss',
      ...configs.flat,
      rules: {
        ...configs.flat.rules,
        ...overrides,
      },
    },
  ];
}
