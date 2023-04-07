/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color':'#0066FF',
      },
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif']
      },
    },
  },
  plugins: [],
}

