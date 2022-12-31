/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily: {
        calistoga: ['Calistoga', 'cursive']
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(50px)',
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
