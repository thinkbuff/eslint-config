import { createJiti } from 'jiti';

/**
 * Asynchronously generates an ESLint configuration.
 *
 * @param {Parameters<import('./src/define-flat-config-async').defineFlatConfigAsync>} args - The arguments to pass to `defineFlatConfig`.
 */
async function defineFlatConfigAsync(...args) {
  const jiti = createJiti(null, { esmResolve: true, interopDefault: true });
  /**
   * @type {import('./src/index')}
   */
  const m = await jiti.import('./src/index.ts');

  return m.defineFlatConfigAsync(...args);
}

export default defineFlatConfigAsync({
  pnpm: true,
  extends: [
    {
      files: ['src/**/*.ts'],
      rules: {
        'perfectionist/sort-objects': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            partitionByComment: true,
            groups: ['top', 'unknown'],
            customGroups: {
              top: ['name', 'type'],
            },
          },
        ],
      },
    },
  ],
});
