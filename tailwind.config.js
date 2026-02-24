/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      colors: {
        primary: "#456432",
        "primary-light": "#77A440",
        "brand-green": "#A4BE86",
        "body-color": "#4A4A4A",
      },
    },
  },
  plugins: [],
};
