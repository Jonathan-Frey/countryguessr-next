/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */ const config =
  {
    semi: false,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 80,
    tabWidth: 2,
    plugins: ['prettier-plugin-tailwindcss'],
    endOfLine: 'lf',
  }

export default config
