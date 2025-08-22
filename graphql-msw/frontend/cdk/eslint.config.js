// @ts-chrck

import eslint from '@eslint/js';
import tseslint, { configs, parser} from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      'out',
      '**/gql/**/*',
      'cdk.out',
      '**/generated/**/*.*',
      'bin/**/*.js',
      'lib/**/*.js',
    ],
  },
  eslint.configs.recommended,
  ...configs.strict,
  ...configs.stylistic,
  {
    files: [
      'bin/**/*.ts',
      'lib/**/*.ts',
      'eslint.config.js',
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
      parser,
      // parserOptions: {
      //   projectService: true,
      //   tsconfigRootDir: import.meta.resolve('./'),
      // },
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
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
    },
  },
);
