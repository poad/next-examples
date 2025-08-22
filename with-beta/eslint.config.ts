// @ts-check

import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import react from 'eslint-plugin-react';
import globals from 'globals';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
// @ts-expect-error ignore type errors
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
// @ts-expect-error ignore type errors
import flowtypePlugin from 'eslint-plugin-flowtype';
// @ts-expect-error ignore type errors
import pluginPromise from 'eslint-plugin-promise';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';

// @ts-ignore
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
  // @ts-ignore
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
    plugins: {
      '@stylistic': stylistic,
      react,
      'react-compiler':reactCompiller,
      'jsx-a11y': jsxA11yPlugin,
      '@next/next': nextPlugin,
      'flow-type': flowtypePlugin,
    },
    extends: [
      // @ts-ignore
      ...compat.config(reactHooksPlugin.configs.recommended),
      ...compat.config(jsxA11yPlugin.configs.recommended),
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    // @ts-ignore
    rules: {
      '@stylistic/semi': 'error',
      '@stylistic/indent': ['error', 2],
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'off',
      'react/require-render-return': 'off',
      'react/display-name': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-string-refs': 'off',
      'react/jsx-no-undef': 'off',
      'react-compiler/react-compiler': "error",
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      '@next/next/no-duplicate-head': 'off',
      '@next/next/no-img-element': 'error',
      '@next/next/no-page-custom-font': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      indent: ['error', 2],
    },
  },
);
