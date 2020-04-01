module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {},
};
