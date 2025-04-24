// @ts-check

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/*.d.ts',
      '**/*.js',
      'node_modules/**/*',
    ],
  },
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      '**/*.d.ts',
      '*.js',
      'node_modules/**/*',
    ],
    files: ['*.ts'],
  },
);
