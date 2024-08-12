/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
    semi: true,
    tabWidth: 2,
    printWidth: 80,
    singleQuote: true,
    trailingComma: 'none',
    jsxBracketSameLine: false,
    plugins: ['prettier-plugin-tailwindcss']
};

export default config;
