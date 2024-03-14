import type { Linter, ESLint } from 'eslint';

export type Awaitable<T> = T | Promise<T>;

export type RulesRecord = Linter.RulesRecord;

export type RuleEntry = Linter.RuleEntry;

export type ESlintPlugin = ESLint.Plugin;

export interface ESLintFlatConfig<Rules = Linter.RulesRecord> extends Omit<Linter.FlatConfig, 'rules' | 'plugins'> {
  /**
   * Custom name of each config item
   */
  name?: string;
  /**
   * An object containing the configured rules. When `files` or `ignores` are specified, these rule configurations are only available to the matching files.
   *
   * @see [Configuring rules](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#configuring-rules)
   */
  rules?: Partial<Rules>;

  // Relax plugins type limitation, as most of the plugins did not have correct type info yet.
  /**
   * An object containing a name-value mapping of plugin names to plugin objects. When `files` is specified, these plugins are only available to the matching files.
   *
   * @see [Using plugins in your configuration](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new#using-plugins-in-your-configuration)
   */
  plugins?: Record<string, any>;
}
