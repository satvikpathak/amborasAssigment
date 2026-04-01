/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F7FF',
          100: '#E0EFFF',
          200: '#B8DFFF',
          300: '#7CC2FF',
          400: '#389FFF',
          500: '#005BB7', // Official eCom Deep Blue
          600: '#0052A3',
          700: '#004385',
          800: '#00366B',
          900: '#00264D',
        },
        warm: {
          bg: '#FDFCFB',
          border: '#F1EFED',
        }
      },
    },
  },
  plugins: [],
};
