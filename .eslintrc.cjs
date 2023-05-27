module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  ignorePatterns: [
    '*.js',
    'src/components/ui/*.tsx',
    'src/components/ui/*.ts'
  ],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'next',
    'prettier',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@next/next/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    // '@typescript-eslint/no-unused-vars': [
    //   2,
    //   {
    //     argsIgnorePattern: '^_'
    //   }
    // ],
    'no-console': [
      "warn", // 0 = off, 1 = warn, 2 = error
      {
        allow: ['warn', 'error']
      }
    ]
  }
}
