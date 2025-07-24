/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Noto Sans Bengali", "serif"],
      },

      backgroundColor: {
        light: "#F4F4F4",
        light2: "#E4E4E4",
        dark: "#1D232A",
        dark2: "#262d36",
      },

      colors: {
        dark: "#F7FAFC",
        light: "#1A202C",
      },

      borderColor: {
        primary: "#FFFFFF/10",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark"],
  },
};
