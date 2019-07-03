module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    BASE_URL: false ,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': [0 ,"error", "windows"],
    'no-param-reassign': 1,
    'class-methods-use-this': 0,
    'max-len': 1,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
};