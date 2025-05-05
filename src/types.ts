import type { Linter, ESLint } from 'eslint';

import type { RuleOptions } from './typegen';

export type Awaitable<T> = T | Promise<T>;

export type RulesRecord = Linter.RulesRecord;

export type RuleEntry = Linter.RuleEntry;

export type ESlintPlugin = ESLint.Plugin;

export type Rules = RuleOptions & {};

export type ESLintFlatConfig = Omit<Linter.Config<RulesRecord & Rules>, 'plugins'> & {
  /**
   * Custom name of each config item
   */
  name?: string;

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
};

export type { ConfigNames } from './typegen';
