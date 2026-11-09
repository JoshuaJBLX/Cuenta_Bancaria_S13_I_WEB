/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
      },
      colors: {
        terminal: {
          green: '#00FF00',
          black: '#000000',
          gray: '#222222',
          border: '#333333',
        },
      },
    },
  },
  plugins: [],
};