module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['import', '@typescript-eslint', 'jest'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  rules: {
    'prettier/prettier': 'error',
    // Note regarding rule severity, the available values are:
    //    'off' or 0 - turn the rule off
    //    'warn' or 1 - turn the rule on as a warning (doesn't effect exit code)
    //    'error' or 2 - turn the rule on as an error (exit code is 1 when triggered)
    //-------------------------------------------------------------------------------------------
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-named-as-default': 0,
    'no-console': 1,
    'spaced-comment': [
      'error',
      'always',
      {
        exceptions: ['=', '-'],
      },
    ],

    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
  },
};
