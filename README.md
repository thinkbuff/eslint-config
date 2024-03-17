# @thinkbuff/eslint-config

[Thinkbuff](https://github.com/thinkbuff)'s ESLint config preset

> Thanks to [antfu/eslint-config](https://github.com/antfu/eslint-config) for the inspiration and reference.

## Usage

- **Requires Node.js `>=18.18.0`.**
- **Requires ESLint `>=8.57.0`.**

### Install

```bash
pnpm i -D eslint @thinkbuff/eslint-config
```

### Create config file (`eslint.config.js`)

See the [ESLint docs](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new) for more information about extending config files.

#### ES Module (Recommended)

With [`"type": "module"`](https://nodejs.org/api/packages.html#type) in `package.json` (recommended):

```js
// eslint.config.js
import { defineFlatConfigAsync } from '@thinkbuff/eslint-config'
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default defineFlatConfigAsync({
  astro: true,
  unocss: true,
  // Additional ESlint Flat Config
  extends: [
    {
      files: ['src/**/*.ts'],
      rules: {
        'perfectionist/sort-objects': 'error',
      },
    },
    // Legacy config
    ...compat.config({
      extends: [
        'eslint:recommended',
        // Other extends...
      ],
    }),
  ]
}
```

#### CommonJS

```js
// eslint.config.js
const { defineFlatConfigAsync } = require('@thinkbuff/eslint-config')
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat()

module.exports = defineFlatConfigAsync({
  astro: true,
  unocss: true,
  // Additional ESlint Flat Config
  extends: [
    {
      files: ['src/**/*.ts'],
      rules: {
        'perfectionist/sort-objects': 'error',
      },
    },
    // Legacy config
    ...compat.config({
      extends: [
        'eslint:recommended',
        // Other extends...
      ],
    }),
  ]
})
```

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## VS Code support

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Enable the ESlint flat config support
  "eslint.experimental.useFlatConfig": true,

  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Enable eslint for supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "astro"
  ]
}
```

## Maintainer

- [Eleven](https://github.com/eteplus)

## License

[MIT](./LICENSE) License &copy; 2024-PRESENT [Thinkbuff](https://github.com/thinkbuff)
