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
      input: {
        valid: {
          colors: [
            "themed",
            "black",
            "white",
            "blue-gray",
            "gray",
            "brown",
            "deep-orange",
            "orange",
            "amber",
            "yellow",
            "lime",
            "light-green",
            "green",
            "teal",
            "cyan",
            "light-blue",
            "blue",
            "indigo",
            "deep-purple",
            "purple",
            "pink",
            "red",
          ],
        },
        styles: {
          base: {
            input: {
              color: "text-blue-gray-700",
              disabled: "disabled:bg-blue-gray-50 disabled:border-0",
            },
            label: {
              color: "peer-placeholder-shown:text-blue-gray-500",
              disabled:
                "peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500",
            },
            icon: {
              color: "text-blue-gray-500",
            },
            asterisk: {
              color: "text-red-500",
            },
          },
          variants: {
            outlined: {
              base: {
                input: {
                  borderColor:
                    "placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200",
                },
              },

              colors: {
                input: {
                  black: {
                    color: "text-red-500",
                    borderColor: "border-black",
                    borderColorFocused: "focus:border-black",
                  },
                  white: {
                    color: "text-white",
                    borderColor: "border-white",
                    borderColorFocused: "focus:border-white",
                  },
                  "blue-gray": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-gray-500",
                  },
                  gray: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-gray-500",
                  },
                  brown: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-brown-500",
                  },
                  "deep-orange": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-orange-500",
                  },
                  orange: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-orange-500",
                  },
                  amber: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-amber-500",
                  },
                  yellow: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-yellow-500",
                  },
                  lime: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-lime-500",
                  },
                  "light-green": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-green-500",
                  },
                  green: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-green-500",
                  },
                  teal: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-teal-500",
                  },
                  cyan: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-cyan-500",
                  },
                  "light-blue": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-blue-500",
                  },
                  blue: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-500",
                  },
                  indigo: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-indigo-500",
                  },
                  "deep-purple": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-purple-500",
                  },
                  purple: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-purple-500",
                  },
                  pink: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-pink-500",
                  },
                  red: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-red-500",
                  },
                },
                label: {
                  black: {
                    color: "!text-black peer-focus:text-black",
                    before:
                      "before:border-black peer-focus:before:!border-black",
                    after: "after:border-black peer-focus:after:!border-black",
                  },
                  white: {
                    color: "!text-white peer-focus:text-white",
                    before:
                      "before:border-white peer-focus:before:!border-white",
                    after: "after:border-white peer-focus:after:!border-white",
                  },
                  "blue-gray": {
                    color: "text-blue-gray-400 peer-focus:text-blue-gray-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-blue-gray-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-blue-gray-500",
                  },
                  gray: {
                    color: "text-blue-gray-400 peer-focus:text-gray-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-gray-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-gray-500",
                  },
                  brown: {
                    color: "text-blue-gray-400 peer-focus:text-brown-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-brown-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-brown-500",
                  },
                  "deep-orange": {
                    color: "text-blue-gray-400 peer-focus:text-deep-orange-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-deep-orange-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-deep-orange-500",
                  },
                  orange: {
                    color: "text-blue-gray-400 peer-focus:text-orange-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-orange-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-orange-500",
                  },
                  amber: {
                    color: "text-blue-gray-400 peer-focus:text-amber-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-amber-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-amber-500",
                  },
                  yellow: {
                    color: "text-blue-gray-400 peer-focus:text-yellow-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-yellow-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-yellow-500",
                  },
                  lime: {
                    color: "text-blue-gray-400 peer-focus:text-lime-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-lime-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-lime-500",
                  },
                  "light-green": {
                    color: "text-blue-gray-400 peer-focus:text-light-green-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-light-green-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-light-green-500",
                  },
                  green: {
                    color: "text-blue-gray-400 peer-focus:text-green-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-green-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-green-500",
                  },
                  teal: {
                    color: "text-blue-gray-400 peer-focus:text-teal-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-teal-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-teal-500",
                  },
                  cyan: {
                    color: "text-blue-gray-400 peer-focus:text-cyan-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-cyan-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-cyan-500",
                  },
                  "light-blue": {
                    color: "text-blue-gray-400 peer-focus:text-light-blue-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-light-blue-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-light-blue-500",
                  },
                  blue: {
                    color: "text-blue-gray-400 peer-focus:text-blue-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-blue-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-blue-500",
                  },
                  indigo: {
                    color: "text-blue-gray-400 peer-focus:text-indigo-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-indigo-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-indigo-500",
                  },
                  "deep-purple": {
                    color: "text-blue-gray-400 peer-focus:text-deep-purple-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-deep-purple-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-deep-purple-500",
                  },
                  purple: {
                    color: "text-blue-gray-400 peer-focus:text-purple-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-purple-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-purple-500",
                  },
                  pink: {
                    color: "text-blue-gray-400 peer-focus:text-pink-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-pink-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-pink-500",
                  },
                  red: {
                    color: "text-blue-gray-400 peer-focus:text-red-500",
                    before:
                      "before:border-blue-gray-200 peer-focus:before:!border-red-500",
                    after:
                      "after:border-blue-gray-200 peer-focus:after:!border-red-500",
                  },
                },
              },
              error: {
                input: {
                  borderColor:
                    "border-red-500 placeholder-shown:border-t-red-500 placeholder-shown:border-red-500",
                  borderColorFocused: "focus:border-red-500",
                },
                label: {
                  color:
                    "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
                  before:
                    "before:border-red-500 peer-focus:before:border-red-500",
                  after: "after:border-red-500 peer-focus:after:border-red-500",
                },
              },
              success: {
                input: {
                  borderColor:
                    "border-green-500 placeholder-shown:border-t-green-500 placeholder-shown:border-green-500",
                  borderColorFocused: "focus:border-green-500",
                },
                label: {
                  color:
                    "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
                  before:
                    "before:border-green-500 peer-focus:before:border-green-500",
                  after:
                    "after:border-green-500 peer-focus:after:border-green-500",
                },
              },
              shrink: {
                label: {
                  borderColor:
                    "before:!border-blue-gray-200 after:!border-blue-gray-200",
                },
              },
            },
            standard: {
              base: {
                input: {
                  borderColor: "placeholder-shown:border-blue-gray-200",
                },
              },

              colors: {
                input: {
                  black: {
                    color: "text-black",
                    borderColor: "border-black",
                    borderColorFocused: "focus:border-black",
                  },
                  white: {
                    color: "text-white",
                    borderColor: "border-white",
                    borderColorFocused: "focus:border-white",
                  },
                  "blue-gray": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-gray-500",
                  },
                  gray: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-gray-500",
                  },
                  brown: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-brown-500",
                  },
                  "deep-orange": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-orange-500",
                  },
                  orange: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-orange-500",
                  },
                  amber: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-amber-500",
                  },
                  yellow: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-yellow-500",
                  },
                  lime: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-lime-500",
                  },
                  "light-green": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-green-500",
                  },
                  green: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-green-500",
                  },
                  teal: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-teal-500",
                  },
                  cyan: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-cyan-500",
                  },
                  "light-blue": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-blue-500",
                  },
                  blue: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-500",
                  },
                  indigo: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-indigo-500",
                  },
                  "deep-purple": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-purple-500",
                  },
                  purple: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-purple-500",
                  },
                  pink: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-pink-500",
                  },
                  red: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-red-500",
                  },
                },
                label: {
                  black: {
                    color: "!text-black peer-focus:text-black",
                    after: "after:border-black peer-focus:after:border-black",
                  },
                  white: {
                    color: "!text-white peer-focus:text-white",
                    after: "after:border-white peer-focus:after:border-white",
                  },
                  "blue-gray": {
                    color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
                    after:
                      "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
                  },
                  gray: {
                    color: "text-blue-gray-500 peer-focus:text-gray-500",
                    after:
                      "after:border-gray-500 peer-focus:after:border-gray-500",
                  },
                  brown: {
                    color: "text-blue-gray-500 peer-focus:text-brown-500",
                    after:
                      "after:border-brown-500 peer-focus:after:border-brown-500",
                  },
                  "deep-orange": {
                    color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
                    after:
                      "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
                  },
                  orange: {
                    color: "text-blue-gray-500 peer-focus:text-orange-500",
                    after:
                      "after:border-orange-500 peer-focus:after:border-orange-500",
                  },
                  amber: {
                    color: "text-blue-gray-500 peer-focus:text-amber-500",
                    after:
                      "after:border-amber-500 peer-focus:after:border-amber-500",
                  },
                  yellow: {
                    color: "text-blue-gray-500 peer-focus:text-yellow-500",
                    after:
                      "after:border-yellow-500 peer-focus:after:border-yellow-500",
                  },
                  lime: {
                    color: "text-blue-gray-500 peer-focus:text-lime-500",
                    after:
                      "after:border-lime-500 peer-focus:after:border-lime-500",
                  },
                  "light-green": {
                    color: "text-blue-gray-500 peer-focus:text-light-green-500",
                    after:
                      "after:border-light-green-500 peer-focus:after:border-light-green-500",
                  },
                  green: {
                    color: "text-blue-gray-500 peer-focus:text-green-500",
                    after:
                      "after:border-green-500 peer-focus:after:border-green-500",
                  },
                  teal: {
                    color: "text-blue-gray-500 peer-focus:text-teal-500",
                    after:
                      "after:border-teal-500 peer-focus:after:border-teal-500",
                  },
                  cyan: {
                    color: "text-blue-gray-500 peer-focus:text-cyan-500",
                    after:
                      "after:border-cyan-500 peer-focus:after:border-cyan-500",
                  },
                  "light-blue": {
                    color: "text-blue-gray-500 peer-focus:text-light-blue-500",
                    after:
                      "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
                  },
                  blue: {
                    color: "text-blue-gray-500 peer-focus:text-blue-500",
                    after:
                      "after:border-blue-500 peer-focus:after:border-blue-500",
                  },
                  indigo: {
                    color: "text-blue-gray-500 peer-focus:text-indigo-500",
                    after:
                      "after:border-indigo-500 peer-focus:after:border-indigo-500",
                  },
                  "deep-purple": {
                    color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
                    after:
                      "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
                  },
                  purple: {
                    color: "text-blue-gray-500 peer-focus:text-purple-500",
                    after:
                      "after:border-purple-500 peer-focus:after:border-purple-500",
                  },
                  pink: {
                    color: "text-blue-gray-500 peer-focus:text-pink-500",
                    after:
                      "after:border-pink-500 peer-focus:after:border-pink-500",
                  },
                  red: {
                    color: "text-blue-gray-500 peer-focus:text-red-500",
                    after:
                      "after:border-red-500 peer-focus:after:border-red-500",
                  },
                },
              },
              error: {
                input: {
                  borderColor:
                    "border-red-500 placeholder-shown:border-red-500",
                  borderColorFocused: "focus:border-red-500",
                },
                label: {
                  color:
                    "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
                  after: "after:border-red-500 peer-focus:after:border-red-500",
                },
              },
              success: {
                input: {
                  borderColor:
                    "border-green-500 placeholder-shown:border-green-500",
                  borderColorFocused: "focus:border-green-500",
                },
                label: {
                  color:
                    "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
                  after:
                    "after:border-green-500 peer-focus:after:border-green-500",
                },
              },
            },
            static: {
              base: {
                input: {
                  borderColor: "placeholder-shown:border-blue-gray-200",
                },
              },

              colors: {
                input: {
                  black: {
                    color: "text-black",
                    borderColor: "border-black",
                    borderColorFocused: "focus:border-black",
                  },
                  white: {
                    color: "text-white",
                    borderColor: "border-white",
                    borderColorFocused: "focus:border-white",
                  },
                  "blue-gray": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-gray-500",
                  },
                  gray: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-gray-500",
                  },
                  brown: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-brown-500",
                  },
                  "deep-orange": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-orange-500",
                  },
                  orange: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-orange-500",
                  },
                  amber: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-amber-500",
                  },
                  yellow: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-yellow-500",
                  },
                  lime: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-lime-500",
                  },
                  "light-green": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-green-500",
                  },
                  green: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-green-500",
                  },
                  teal: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-teal-500",
                  },
                  cyan: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-cyan-500",
                  },
                  "light-blue": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-light-blue-500",
                  },
                  blue: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-blue-500",
                  },
                  indigo: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-indigo-500",
                  },
                  "deep-purple": {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-deep-purple-500",
                  },
                  purple: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-purple-500",
                  },
                  pink: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-pink-500",
                  },
                  red: {
                    borderColor: "border-blue-gray-200",
                    borderColorFocused: "focus:border-red-500",
                  },
                },
                label: {
                  black: {
                    color: "!text-black peer-focus:black",
                    after: "after:border-black peer-focus:after:border-black",
                  },
                  white: {
                    color: "!text-white peer-focus:white",
                    after: "after:border-white peer-focus:after:border-white",
                  },
                  "blue-gray": {
                    color: "text-blue-gray-500 peer-focus:text-blue-gray-500",
                    after:
                      "after:border-blue-gray-500 peer-focus:after:border-blue-gray-500",
                  },
                  gray: {
                    color: "text-blue-gray-500 peer-focus:text-gray-500",
                    after:
                      "after:border-gray-500 peer-focus:after:border-gray-500",
                  },
                  brown: {
                    color: "text-blue-gray-500 peer-focus:text-brown-500",
                    after:
                      "after:border-brown-500 peer-focus:after:border-brown-500",
                  },
                  "deep-orange": {
                    color: "text-blue-gray-500 peer-focus:text-deep-orange-500",
                    after:
                      "after:border-deep-orange-500 peer-focus:after:border-deep-orange-500",
                  },
                  orange: {
                    color: "text-blue-gray-500 peer-focus:text-orange-500",
                    after:
                      "after:border-orange-500 peer-focus:after:border-orange-500",
                  },
                  amber: {
                    color: "text-blue-gray-500 peer-focus:text-amber-500",
                    after:
                      "after:border-amber-500 peer-focus:after:border-amber-500",
                  },
                  yellow: {
                    color: "text-blue-gray-500 peer-focus:text-yellow-500",
                    after:
                      "after:border-yellow-500 peer-focus:after:border-yellow-500",
                  },
                  lime: {
                    color: "text-blue-gray-500 peer-focus:text-lime-500",
                    after:
                      "after:border-lime-500 peer-focus:after:border-lime-500",
                  },
                  "light-green": {
                    color: "text-blue-gray-500 peer-focus:text-light-green-500",
                    after:
                      "after:border-light-green-500 peer-focus:after:border-light-green-500",
                  },
                  green: {
                    color: "text-blue-gray-500 peer-focus:text-green-500",
                    after:
                      "after:border-green-500 peer-focus:after:border-green-500",
                  },
                  teal: {
                    color: "text-blue-gray-500 peer-focus:text-teal-500",
                    after:
                      "after:border-teal-500 peer-focus:after:border-teal-500",
                  },
                  cyan: {
                    color: "text-blue-gray-500 peer-focus:text-cyan-500",
                    after:
                      "after:border-cyan-500 peer-focus:after:border-cyan-500",
                  },
                  "light-blue": {
                    color: "text-blue-gray-500 peer-focus:text-light-blue-500",
                    after:
                      "after:border-light-blue-500 peer-focus:after:border-light-blue-500",
                  },
                  blue: {
                    color: "text-blue-gray-500 peer-focus:text-blue-500",
                    after:
                      "after:border-blue-500 peer-focus:after:border-blue-500",
                  },
                  indigo: {
                    color: "text-blue-gray-500 peer-focus:text-indigo-500",
                    after:
                      "after:border-indigo-500 peer-focus:after:border-indigo-500",
                  },
                  "deep-purple": {
                    color: "text-blue-gray-500 peer-focus:text-deep-purple-500",
                    after:
                      "after:border-deep-purple-500 peer-focus:after:border-deep-purple-500",
                  },
                  purple: {
                    color: "text-blue-gray-500 peer-focus:text-purple-500",
                    after:
                      "after:border-purple-500 peer-focus:after:border-purple-500",
                  },
                  pink: {
                    color: "text-blue-gray-500 peer-focus:text-pink-500",
                    after:
                      "after:border-pink-500 peer-focus:after:border-pink-500",
                  },
                  red: {
                    color: "text-blue-gray-500 peer-focus:text-red-500",
                    after:
                      "after:border-red-500 peer-focus:after:border-red-500",
                  },
                },
              },
              error: {
                input: {
                  borderColor:
                    "border-red-500 placeholder-shown:border-red-500",
                  borderColorFocused: "focus:border-red-500",
                },
                label: {
                  color:
                    "text-red-500 peer-focus:text-red-500 peer-placeholder-shown:text-red-500",
                  after: "after:border-red-500 peer-focus:after:border-red-500",
                },
              },
              success: {
                input: {
                  borderColor:
                    "border-green-500 placeholder-shown:border-green-500",
                  borderColorFocused: "focus:border-green-500",
                },
                label: {
                  color:
                    "text-green-500 peer-focus:text-green-500 peer-placeholder-shown:text-green-500",
                  after:
                    "after:border-green-500 peer-focus:after:border-green-500",
                },
              },
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
});
