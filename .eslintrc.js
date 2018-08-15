// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  extends: ['airbnb', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      'node': {
        'moduleDirectory': ['src','node_modules'],
      }
    },
  },
  // add your custom rules here
  rules: {
    'prettier/prettier': 'error',
    'react/forbid-prop-types': [2, { forbid: ['any'] }],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-sequences': [1],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref'],
      },
    ],
  },
};
