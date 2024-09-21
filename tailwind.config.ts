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
        netral: {
          100: "#121212",
          200: "#1d1d1d",
          300: "#8c8c8c",
          400: "#a6a6a6",
          500: "#cbcbcb",
          600: "#fcfcfc",
        },
        utama: {
          100: "#1d242b",
          200: "#0077c0",
          300: "#c7eeff",
          400: "#fafafa",
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
