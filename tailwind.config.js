/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0066FF",
      },
      fontFamily: {
        sans: ["var(--font-work)", ...fontFamily.sans],
        poppins : ["var(--font-poppins)", ...fontFamily.sans]
      },
    },
  },
  plugins: [],
};
