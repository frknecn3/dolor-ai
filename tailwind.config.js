// tailwind.config.js

module.exports = {
  content: [
    "./app/**/*.{jsx,js,ts,tsx}",
    "./src/components/*.{jsx,js,ts,tsx}",
    "./src/components/Main.jsx",
    "./App.js",
    "./*.{jsx,js,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9D00FF",
        secondary: {
          DEFAULT: "#4f0080",
          100: "#9D00FF",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}
 // ...
