import { defineConfig } from 'eslint/config';

export default defineConfig({
    rules: {
    semi: ['error', 'always'],
    'no-console': 'warn',
    },
    ignores: ['node_modules/', 'dist/', 'test/', '**/*.spec.js', '.nuxt/', '**/*.mjs'],
});
