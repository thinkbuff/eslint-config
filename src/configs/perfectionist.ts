import PerfectionistPlugin from 'eslint-plugin-perfectionist';

import type { ESLintFlatConfig } from '../types';

/**
 * Optional perfectionist plugin for props and items sorting.
 *
 * @see https://github.com/azat-io/eslint-plugin-perfectionist
 */
export async function perfectionist(): Promise<ESLintFlatConfig[]> {
  return [
    {
      name: 'thinkbuff:perfectionist',
      plugins: {
        perfectionist: PerfectionistPlugin,
      },
    },
  ];
}
