import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImports from 'eslint-plugin-no-relative-import-paths';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsEslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{ts,tsx}'] },
    {
        ignores: [
            'public',
            'dist',
            'build',
            'node_modules',
            'scripts',
            '.cursor',
        ],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    importPlugin.flatConfigs.recommended,
    unicorn.configs['flat/recommended'],
    {
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: {},
            },
        },
    },
    {
        plugins: {
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            'no-relative-import-paths': noRelativeImports,
            prettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            'arrow-body-style': ['error', 'as-needed'],
            'consistent-return': 'off',
            curly: 'error',
            'no-console': 'warn',
            'no-magic-numbers': [
                'error',
                {
                    ignore: [0, 1, -1],
                    ignoreArrayIndexes: true,
                    ignoreDefaultValues: true,
                    enforceConst: true,
                },
            ],
            'no-param-reassign': 'warn',
            'no-unused-vars': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: ['./', '../'],
                },
            ],
            'no-use-before-define': 'warn',
            'prefer-template': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-boolean-value': 'error',
            'react/button-has-type': 'off',
            'react/prop-types': 'off',
            'react/no-array-index-key': 'warn',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            'react/no-unused-prop-types': 'off',
            'func-style': [
                'error',
                'declaration',
                { allowArrowFunctions: true },
            ],
            'react/function-component-definition': 'off',
            'react/jsx-filename-extension': [
                'error',
                { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
            ],
            'react/jsx-curly-brace-presence': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                { allowExpressions: true },
            ],
            'react-hooks/exhaustive-deps': 'off',
            'prettier/prettier': [
                'error',
                {
                    endOfLine: 'auto',
                },
            ],
            'no-relative-import-paths/no-relative-import-paths': [
                'warn',
                {
                    allowSameFolder: false,
                    rootDir: 'src',
                },
            ],
            'unicorn/no-array-for-each': 'off',
            'unicorn/no-null': 'off',
            'unicorn/prefer-spread': 'off',
            'unicorn/expiring-todo-comments': 'off',
            'unicorn/no-document-cookie': 'off',
            'unicorn/filename-case': [
                'error',
                {
                    cases: {
                        pascalCase: true,
                        camelCase: true,
                    },
                    // upperCamelCase
                    ignore: [
                        /^[A-Z]+[A-Za-z0-9]*\.\w+\.(tsx|ts)$/,
                        'utils.ts',
                        'not-found.tsx',
                        /\.d\.ts$/, // ← добавляем это
                    ],
                },
            ],
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/prefer-global-this': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/template-indent': 'off',
            'unicorn/prefer-add-event-listener': 'warn',
            'react-hooks/set-state-in-effect': 'off',
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    ts: 'never',
                    tsx: 'never',
                    js: 'never',
                    jsx: 'never',
                },
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'object',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'object',
                            position: 'before',
                        },
                        {
                            pattern: '@/App/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/store/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/styles/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/types/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/images/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/routes/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/api/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/configs/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/hooks/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/helpers/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/assets/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/pages/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/layouts/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/components/**',
                            group: 'internal',
                            position: 'before',
                        },
                        {
                            pattern: '@/components/**',
                            group: 'internal',
                            position: 'before',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['builtin', 'object'],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: false,
                    },
                    'newlines-between': 'never',
                },
            ],
        },
    },
];
