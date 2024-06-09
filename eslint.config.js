import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      '**/dist/*',
      "**/*.config.js",
      "**/*.config.ts",
      'tsconfig.json',
    ]
  },
  { 
    languageOptions: {
      globals: {...globals.browser, ...globals.node},
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: ['error', 'always', { omitLastInOneLineBlock: false }],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
      'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
      '@typescript-eslint/ban-types': ['error', {
        types: {
          Function: false,
        },
        extendDefaults: true,
      }],
      'max-len': ['warn', { code: 140, ignoreComments: true, ignoreUrls: true }],
      'indent': ["error", 2],
      "@typescript-eslint/ban-ts-comment": "off"
    }
  }
];