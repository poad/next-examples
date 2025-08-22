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
        node: true,
      },
    },
    // @ts-ignore
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/arrow-parens': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
    },
  },
);
