module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 0,
    camelcase: 'off',
    'object-shorthand': 'off',
    'max-len': ['error', { code: 200 }],
    'new-cap': 0,
  },
};
