// @ts-chrck

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      'out',
      'cdk.out',
      '**/generated/**',
      '**/*.js',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    files: [
      'bin/**/*.ts',
      'lib/**/*.ts',
      'lambda/**/*.ts',
    ],
    plugins: {
      '@stylistic': stylistic,
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      // parserOptions: {
      //   projectService: true,
      //   tsconfigRootDir: import.meta.resolve('./'),
      // },
    },
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        'typescript': true,
        'node': true,
      },
    },
    rules: {
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
);
