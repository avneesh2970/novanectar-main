import type { Config } from "tailwindcss";

import svgToDataUri from "mini-svg-data-uri";
// import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    addVariablesForColors,

    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="175" height="175" fill="none" stroke="${value}" stroke-width="0.2">
      <path d="M0 .5H31.5V32"/>
      <circle cx="31.5" cy="0.5" r="0.5" fill="#777777" />              
    </svg>`
            )}")`,
          }),
          "bg-grid-hover": () => ({
            backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="175" height="175" fill="none" stroke="#1E90FF" stroke-width="0.5">
      <defs>
        <filter id="blur-effect" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" /> <!-- Blur effect -->
          <feBlend in="SourceGraphic" in2="blur-effect" mode="hard-light" /> <!-- Hard light effect -->
        </filter>
      </defs>
      <g filter="url(#blur-effect)">
        <path d="M0 .5H31.5V32" />
        <circle cx="31.5" cy="0.5" r="0.5" fill="blue" />
      </g>
    </svg>`
            )}")`,
          }),
          //       "grid-hover-blue": (value: any) => ({
          //         backgroundImage: `url("${svgToDataUri(
          //           `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="175" height="175" fill="none" stroke="${value}" stroke-width="0.5">
          //   <path d="M0 .5H31.5V32"/>
          //   <circle cx="31.5" cy="0.5" r="0.5" fill="#3B82F6" />
          // </svg>`
          //         )}")`,
          //       }),
          "bg-grid-small": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
} satisfies Config;
