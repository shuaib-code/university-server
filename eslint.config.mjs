import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'], // Handle both JS and TS/TSX
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        process: 'readonly',
      },
    },
    plugins: [pluginImport, tseslint.plugin, 'prettier'],
    rules: {
      'no-unused-vars': 'error', // Ensure no unused variables
      'no-unused-expressions': 'error', // Avoid unused expressions
      'prefer-const': 'error', // Encourage const usage
      'no-console': 'warn', // Allow console warnings, but discourage usage in prod
      'no-undef': 'error', // Ensure all variables are declared
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          pathGroups: [
            {
              pattern: 'module-alias/register',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-async-promise-executor': 'warn', // Warn against async in promise executors
      'no-eval': 'error', // Avoid eval usage for security reasons
      'consistent-return': 'warn', // Encourage consistency in return values
      'no-shadow': 'error', // Prevent variable shadowing
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
];
