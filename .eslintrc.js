module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    camelcase: 'warn',
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-underscore-dangle': 0,
    'no-unused-vars': 'error',
    'no-useless-escape': 0,
    strict: 'off',
    'no-unused-expressions': 0,
    'class-methods-use-this': 0,
    'max-len': [
      'warn',
      {
        code: 120,
      },
    ],
  },
};
