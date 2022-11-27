module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    'no-console': ['warn', {
      allow: ['warn', 'error', 'debug', 'assert']
    }],
    'default-case': 'error',
    'arrow-parens': ['error', 'as-needed'],
    eqeqeq: 'off',
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    'react/jsx-indent': [2, 2, {
      checkAttributes: true,
      indentLogicalExpressions: true
    }],
    '@typescript-eslint/no-namespace': 'off'
  }
}
