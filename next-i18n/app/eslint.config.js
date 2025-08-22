// @ts-check

import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

import tseslint, { configs, parser } from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      'src/tsconfig.json',
      'src/stories',
      '**/*.css',
      'node_modules/**/*',
      './.next/*',
      'out',
      '.storybook',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  ...compat.config({
    extends: ['plugin:storybook/recommended'],
    ignorePatterns: ['!.storybook', 'storybook-static'],
  }),
  {
    files: ['src/**/*.{jsx,tsx}', 'eslint.config.mjs'],
    plugins: {
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
      '@stylistic': stylistic,
    },
    extends: [
      // @ts-expect-error ignore type errors
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        'typescript': true,
        'node': true,
      },
    },
    // @ts-expect-error ignore type errors
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
