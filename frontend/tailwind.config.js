/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          background: 'rgba(21, 21, 23, 0.95)',
          loadBack: 'rgba(21, 21, 23, 0.1)',
        },
      },
    },
  },
  plugins: [],
};
