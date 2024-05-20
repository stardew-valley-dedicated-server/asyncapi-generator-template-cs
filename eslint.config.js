/* eslint-disable @typescript-eslint/no-var-requires */
const react = require('eslint-plugin-react');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');

module.exports = [
  {
    files: ['**/*.js'],
    plugins: {
      react,
      '@stylistic': stylistic,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          ecmaFeatures: { modules: true },
          ecmaVersion: 'latest',
          jsx: true,
        },
      },
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'error',
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true }],
      '@stylistic/indent': ['error', 2],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/semi': 'error',
    },
    ignores: [
      '.output/**/*.*',
      '__transpiled/**/*.*',
    ],
  },
];
