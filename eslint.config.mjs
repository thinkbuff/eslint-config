import jiti from 'jiti';

/**
 * Asynchronously generates an ESLint configuration.
 *
 * @param {Parameters<import('./src/define-flat-config').defineFlatConfig>} args - The arguments to pass to `defineFlatConfig`.
 */
async function defineFlatConfigAsync(...args) {
  const JITI = jiti(null, { esmResolve: true, interopDefault: true });
  /**
   * @type {import('./src/index')}
   */
  const m = await JITI('./src/index.ts');

  return m.defineFlatConfigAsync(...args);
}

export default defineFlatConfigAsync();
