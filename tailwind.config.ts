import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          a: "#273043",
          b: "#9197ae",
          c: "#eff6ee",
          d: "#f02d3a",
          e: "#dd0426",
        },
        main: '#4A5568', // Neutral gray
        secondary: '#E2E8F0', // Light gray for background
        accent: '#38B2AC', // Subtle teal for buttons/links
      },
      fontFamily: {
        exo: ['Exo 2', 'cursive'] 
      }
    },
  },
  plugins: [],
};
export default config;
