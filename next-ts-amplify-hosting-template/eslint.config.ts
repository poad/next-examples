import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import {configs as storybookConfigs} from 'eslint-plugin-storybook';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error ignore type errors
import flowtypePlugin from 'eslint-plugin-flowtype';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';
// @ts-expect-error ignore type errors
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// import reactRefresh from "eslint-plugin-react-refresh";
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';
import { configs, parser } from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const compat = new FlatCompat();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '.next',
      '**/*.d.ts',
      'out',
      '**/gql/**/*',
      'cdk.out',
      '**/generated/**/*.*',
      'src/gql/*.ts',
      'public/**/*.js',
      'cdk/**/*',
      'storybook-static',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  reactHooks.configs.flat.recommended,
  // reactRefresh.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...react.configs.flat.recommended,
    ...react.configs.flat['jsx-runtime'],
    languageOptions: {
      ...react.configs.flat.recommended.languageOptions,
      parser,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      // @ts-expect-error ignore type errors
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    settings: {
      react: {
        version: 'detect',
      },
      formComponents: ['Form'],
      linkComponents: [
        { name: 'Link', linkAttribute: 'to' },
        { name: 'NavLink', linkAttribute: 'to' },
      ],
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: {
          extensions: ['.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    plugins: {
      // @ts-expect-error ignore type errors
      '@next/next': nextPlugin,
      'flow-type': flowtypePlugin,

      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
      // @ts-expect-error ignore type errors
      ...storybookConfigs.recommended.rules,
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
