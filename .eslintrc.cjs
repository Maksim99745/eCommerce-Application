module.exports = {
  root: true,
  env: { browser: true, es2022: true, 'jest/globals': true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:jest/recommended',
    'plugin:jest-dom/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react', 'prettier', 'jest', 'jest-dom', 'unused-imports'],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1],
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true
      }
    ],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-classes-per-file': ['error', 1],
    'no-debugger': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit'
        }
      }
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }],
    'curly': ['error', 'all'],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'quotes': ['error', 'single', { allowTemplateLiterals: true }],
    'semi': ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'key-spacing': ['error', { afterColon: true }],
    'jest/no-disabled-tests': 'warn',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    'jest-dom/prefer-checked': 'error',
    'jest-dom/prefer-enabled-disabled': 'error',
    'jest-dom/prefer-required': 'error',
    'jest-dom/prefer-to-have-attribute': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-return-assign': 'off',
  }
};
