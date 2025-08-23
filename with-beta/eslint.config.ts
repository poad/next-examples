// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
// @ts-expect-error ignore type errors
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// @ts-expect-error ignore type errors
import flowtypePlugin from 'eslint-plugin-flowtype';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

import reactCompiller from 'eslint-plugin-react-compiler';

const compat = new FlatCompat();

export default tseslint.config(
  {
    ignores: [
      '*.d.ts',
      '*.{js,jsx}',
      'src/tsconfig.json',
      '*.css',
      'node_modules/**/*',
      '.next',
      'out',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  ...compat.config({
    extends: ['next/core-web-vitals'],
  }),
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: '19.0.0',
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
    extends: [
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
    ],
    plugins: {
      '@stylistic': stylistic,
      react,
      'react-compiler':reactCompiller,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
      'flow-type': flowtypePlugin,
    },
    // @ts-expect-error ignore type errors
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/quotes': ['error', 'single'],
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/require-render-return': 'off',
      'react/display-name': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-string-refs': 'off',
      'react/jsx-no-undef': 'off',
      'react-compiler/react-compiler': 'error',
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
    },
  },
);
