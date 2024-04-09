import PerfectionistPlugin from 'eslint-plugin-perfectionist';

import type { ESLintFlatConfig } from '../types';

export interface PerfectionistOptions {
  preset?: 'alphabetical' | 'natural' | 'line-length';
}

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(options: PerfectionistOptions = {}): Promise<ESLintFlatConfig[]> {
  const { preset } = options;
  const rules = preset ? PerfectionistPlugin?.configs?.[`recommended-${preset}`]?.rules : {};

  return [
    {
      name: 'thinkbuff:perfectionist',
      plugins: {
        perfectionist: PerfectionistPlugin,
      },
      rules: {
        ...rules,
      },
    },
  ];
}
