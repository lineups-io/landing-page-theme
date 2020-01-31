module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  extends: ['standard', 'plugin:jsx-a11y/strict', 'plugin:react/recommended'],
  plugins: [],
  rules: {
    'quote-props': ['error', 'consistent-as-needed'],
    'template-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
    }],

    // react plugin - options
    'react/prop-types': 'off',
    'react/display-name': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    },
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' }
    ]
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  }
}
