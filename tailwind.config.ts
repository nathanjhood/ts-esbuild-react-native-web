import type { Config } from "tailwindcss";
import defaultConfig from "./tailwind.default";
import defaultColors from "tailwindcss/colors";

export const config: Config = {
  content: ["./public/index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   ...defaultColors,
    // },
    extend: {},
  },
  plugins: [],
} satisfies Config;

// import resolveConfig from 'tailwindcss/resolveConfig'
// import tailwindConfig from './tailwind.config.js'

// const fullConfig = resolveConfig(tailwindConfig)

// fullConfig.theme.width[4]
// // => '1rem'

// fullConfig.theme.screens.md
// // => '768px'

// fullConfig.theme.boxShadow['2xl']
// // => '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
