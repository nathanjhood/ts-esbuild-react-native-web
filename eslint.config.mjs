import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import * as eslint from 'eslint';

/** @type {'browser' | 'node'} */
const environment = 'browser'

/** @type {'commonjs' | 'module'} */
const format = 'module'

/** @type {eslint.Linter.Config['rules']} */
const rules = {
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-unused-vars': 'warn'

}

const configs = {
  browser: {
    commonjs: [
      { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
      { files: ["**/*.{d.ts}"] },
      { files: ["**/*.config.{cjs,mjs}"] },
      { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      { rules: rules }
    ],
    module: [
      { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,d.ts}"] },
      { files: ["**/*.{d.ts}"] },
      { files: ["**/*.config.{cjs,mjs}"] },
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      { rules: rules }
    ]
  },
  node: {
    commonjs: [
      { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,d.ts}"] },
      { files: ["**/*.{d.ts}"] },
      { files: ["**/*.config.{cjs,mjs}"] },
      { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      { rules: rules }
    ],
    module: [
      { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,d.ts}"] },
      { files: ["**/*.{d.ts}"] },
      { files: ["**/*.config.{cjs,mjs}"] },
      { languageOptions: { globals: globals.browser } },
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      { rules: rules }
    ]
  }
}

export default (() => configs[environment][format])();
