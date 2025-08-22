// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

import tseslint, { configs, parser } from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'src/tsconfig.json',
      'src/stories',
      '**/*.css',
      'node_modules/**/*',
      './.next/*',
      'out',
      '.storybook',
      '**/*.js',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  {
    files: ['src/**/*.{jsx,tsx}'],
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        'typescript': true,
        'node': true,
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
