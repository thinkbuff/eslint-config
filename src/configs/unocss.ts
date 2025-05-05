import type { ESLintFlatConfig } from '../types';
import { resolveModule } from '../utils';

export interface UnocssOptions {
  overrides?: ESLintFlatConfig['rules'];
}

export async function unocss(options: UnocssOptions = {}): Promise<ESLintFlatConfig[]> {
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
