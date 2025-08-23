import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import storybookPlugin from 'eslint-plugin-storybook';
import importPlugin from 'eslint-plugin-import';
import tseslint, { configs, parser, ConfigArray } from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import hooksPlugin from 'eslint-plugin-react-hooks';
// @ts-expect-error ignore type errors
import flowtypePlugin from 'eslint-plugin-flowtype';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';
// @ts-expect-error ignore type errors
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import { FlatCompat } from '@eslint/eslintrc';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const compat = new FlatCompat();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

const eslintConfig: ConfigArray = tseslint.config(
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
  {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '*.ts',
      '*.tsx',
      '.storybook/**/*.ts',
    ],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
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
      'import/internal-regex': '^~/',
      'import/resolver': {
        node: true,
        typescript: true,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
      'flow-type': flowtypePlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      // @ts-expect-error ignore type errors
      ...storybookPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
);

export default eslintConfig;
