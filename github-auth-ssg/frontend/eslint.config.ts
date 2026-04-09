import { defineConfig, globalIgnores } from 'eslint/config';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
// @ts-expect-error ignore plugin type
import pluginPromise from 'eslint-plugin-promise';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { parser } from 'typescript-eslint';
import globals from 'globals';

import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');

export default defineConfig(
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'src/tsconfig.json',
      'src/next-env.d.ts',
      'src/stories',
      'node_modules/**/*',
      './.next/*',
      'cdk',
    ],
  },
  eslint.configs.recommended,
  pluginPromise.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
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
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
