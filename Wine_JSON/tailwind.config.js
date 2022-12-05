/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Dancing_Script: ['Dancing Script', 'cursive'],
        arimu_madurai: ['Arima Madurai', 'cursive'],
        Merianda: ['Merienda', 'cursive']
      },
    },
  },
  plugins: [],
}
