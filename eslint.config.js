import pluginJs from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import noRelativeImports from 'eslint-plugin-no-relative-import-paths';
import prettier from 'eslint-plugin-prettier';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tsEslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['**/*.{ts,tsx}'] },
    {
        ignores: ['public', 'dist', 'build', '.next', 'node_modules'], // добавлен .next
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    importPlugin.flatConfigs.recommended,
    unicorn.configs['flat/recommended'],
    // Добавляем плагин Next.js
    {
        plugins: {
            '@next/next': nextPlugin,
        },
        rules: {
            ...nextPlugin.configs.recommended.rules,
        },
    },
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
            'react/function-component-definition': [
                'error',
                {
                    namedComponents: 'arrow-function',
                    unnamedComponents: 'arrow-function',
                },
            ],
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
            'react-hooks/exhaustive-deps': 'off', // можно включить, если хотите
            'prettier/prettier': ['error', { endOfLine: 'auto' }],
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
                    ignore: [
                        /^[A-Z]+[A-Za-z0-9]*\.\w+\.(tsx|ts)$/,
                        'utils.ts',
                        /\.d\.ts$/,
                    ],
                },
            ],
            'unicorn/prevent-abbreviations': [
                'error',
                {
                    allowList: {
                        Props: true,
                        props: true,
                        Ref: true,
                        utils: true,
                    },
                },
            ],
            'unicorn/prefer-global-this': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/template-indent': 'off',
            'unicorn/prefer-add-event-listener': 'warn',
            'react-hooks/set-state-in-effect': 'off',
        },
    },
];
