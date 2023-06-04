/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["var(--nunito-font)", ...fontFamily.sans],
        serif: ["var(--nunito-font)", ...fontFamily.serif],
      },
      colors: {
        "primary-red": "#FF4242",
        "primary-red-dark": "#E74747",
        "primary-dark": "#2E2E2E",
      },
    },
  },
  plugins: [],
};
