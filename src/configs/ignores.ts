import type { ESLintFlatConfig } from '../types';

export async function ignores(): Promise<ESLintFlatConfig[]> {
  return [
    {
      ignores: [
        '**/node_modules',
        '**/dist',
        '**/build',
        '**/fixtures',
        '**/package-lock.json',
        '**/yarn.lock',
        '**/pnpm-lock.yaml',
        '**/bun.lockb',
        '**/output',
        '**/coverage',
        '**/temp',
        '**/.temp',
        '**/tmp',
        '**/.tmp',
        '**/.history',
        '**/.vitepress/cache',
        '**/.nitro',
        '**/.nuxt',
        '**/.next',
        '**/.vercel',
        '**/.changeset',
        '**/.idea',
        '**/.cache',
        '**/.output',
        '**/.vite-inspect',
        '**/.yarn',
        '**/CHANGELOG*.md',
        '**/*.min.*',
        '**/LICENSE*',
        '**/__snapshots__',
        '**/auto-import?(s).d.ts',
        '**/components.d.ts',
      ],
    },
  ];
}
