/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // scan all React TSX files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#003d80",
        secondary: "#0d57a7",
        tertiary: "#2575cb",
        grey: "#bdc5d0",
        white: "#FEFEFD",
        black: "#000000",
      },
      fontFamily: {
        sans: ["var(--default-font)", "sans-serif"],
        heading: ["var(--heading-font)", "sans-serif"],
        nav: ["var(--nav-font)", "sans-serif"],
      },
      fontSize: {
        body: ["1rem", { lineHeight: "1.5rem" }],
        small: ["0.875rem", { lineHeight: "1.25rem" }],
        h1: ["2rem", { lineHeight: "2.5rem" }],
        h2: ["1.5rem", { lineHeight: "2rem" }],
        h3: ["1.25rem", { lineHeight: "1.75rem" }],
        button: ["1rem", { lineHeight: "1.5rem" }],
      },
    },
  },
  plugins: [],
};
