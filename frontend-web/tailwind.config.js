/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],

  theme: {
    extend: {
      colors: {
        themeBlue: '#27005D',
        themePurple: '#9400FF',
        themeLightBlue: '#AED2FF',
        themeLightGray: '#E4F1FF',
      },
    },
  },
}

