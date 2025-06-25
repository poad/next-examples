// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      '*.{js,jsx}',
      'src/tsconfig.json',
      'src/stories',
      '**/*.css',
      'node_modules/**/*',
      '.next/*',
      'out',
      '.storybook',
      'wasm',
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
    ],
    plugins: {
      '@stylistic': stylistic,
      '@stylistic/ts': stylistic,
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
        typescript: {},
      },
    },
    // @ts-ignore
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/ts/indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'always'],
      quotes: ['error', 'single'],
    },
  },
);
