import js from '@eslint/js';

export default [
  {
    ignores: [
      'node_modules/',
      '.nuxt/',
      '.output/',
      'dist/',
      'tests/',
      '**/*.spec.*',
      '*.config.*',
      '*.mjs',
      '*.yaml',
      '*.yml',
    ],
  },
  js.configs.recommended,
  {
    rules: {
      semi: ['error', 'always'],
      'no-console': 'warn',
    },
  },
];

