import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { parser } from 'typescript-eslint';
import globals from 'globals';

import stylistic from '@stylistic/eslint-plugin';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig(
  ...nextVitals,
  ...nextTs,
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '.next',
      '**/*.d.ts',
      '*.js',
      'out',
      '**/gql/**/*',
      'cdk.out',
      '**/generated/**/*.*',
      'src/gql/*.ts',
      'public/**/*.js',
      'cdk',
    ],
  },
  eslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '*.ts',
      '*.tsx',
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    languageOptions: {
      parser,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: '19.2',
      },
    },
    rules: {
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
);
