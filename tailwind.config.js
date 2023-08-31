/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          alt: "var(--color-text-alt)",
          inverted: "var(--color-text-inverted)",
          info: "var(--color-text-info)",
          highlight: "var(--color-text-highlight)",
          "highlight-hover": "var(--color-text-highlight-hover)",
          selected: "var(--color-text-selected)",
        },
      },
      backgroundColor: {
        skin: {
          primary: "var(--color-background-primary)",
          alt: "var(--color-background-alt)",
          card: "var(--color-background-card)",
          "button-base": "var(--color-button-base)",
          "button-delete": "var(--color-button-delete)",
          "button-hover": "var(--color-button-hover)",
          "button-action": "var(--color-button-action)",
          "button-success": "var(--color-button-success)",
          "alert-danger": "var(--color-alert-danger)",
          "alert-info": "var(--color-alert-info)",
          "button-flat": "var(--color-button-flat)",
          "button-flat-hover": "var(--color-button-flat-hover)",
          panel: "var(--color-background-panel)",
          pane: "var(--color-background-pane)",
        },
      },
      borderColor: {
        skin: {
          highlight: "var(--color-text-highlight)",
          base: "var(--color-text-base)",
          panel: "var(--color-button-flat)",
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
});
