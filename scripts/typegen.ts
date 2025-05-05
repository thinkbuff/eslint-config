import fs from 'node:fs/promises';
import { flatConfigsToRulesDTS } from 'eslint-typegen/core';

import { astro, imports, javascript, perfectionist, react, stylistic, typescript, unicorn, unocss } from '#configs';

const configs = await Promise.all([
  astro(),
  imports(),
  javascript(),
  perfectionist(),
  react(),
  stylistic(),
  typescript(),
  unicorn(),
  unocss(),
]).then(c => c.flat());

const configNames = configs.map(c => c.name).filter(Boolean) as string[];

let dts = await flatConfigsToRulesDTS(configs, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`;

await fs.writeFile('src/typegen.d.ts', dts);
