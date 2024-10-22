import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F0FF',
          100: '#E0E0FF',
          200: '#C2C2FF',
          300: '#A3A3FF',
          400: '#8585FF',
          500: '#6666FF',
          600: '#4D4DFF',
          700: '#3333FF',
          800: '#1A1AFF',
          900: '#0000FF',
        },
        background: {
          dark: '#000000',
          light: '#1A1C1E',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0AEC0',
        },
        accent: {
          blue: '#55B1DF',
          purple: '#817DEC',
          green: '#98D5BB',
          pink: '#DEB2EB',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};

export default config;
