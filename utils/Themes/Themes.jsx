import { createTheme } from "@mui/material";

export const Themes = {
  classic: {
    "text-base": "black",
    "text-inverted": "white",
    "text-alt": "gray",
    "text-info": "#202020",
    "text-highlight": "blue",
    "text-selected": "green",
    "text-important": "orange",

    "background-primary": "white",
    "background-alt": "black",
    "background-card": "dodgerblue",
    "background-panel": "#aaa",

    "button-base": "blue",
    "button-delete": "indianred",
    "button-hover": "#aaa",
    "button-action": "white",
    "button-success": "green",
    "button-flat": "gray",
    "button-flat-hover": "#404040",

    "alert-danger": "indianred",
    "alert-info": "yellow",

    "input-color": "blue",
  },
  moonlit: {
    "text-base": "white",
    "text-alt": "gray", //primary
    "text-highlight": "blue", //primary

    "button-base": "blue", //primary
    "button-delete": "red", //primary
    "button-success": "green", //primary
    "button-flat": "gray", //primary

    "input-color": "white",
  },
  dawn: {
    "text-base": "black",
    "text-alt": "black", //primary
    "text-highlight": "brown", //primary

    "button-base": "brown", //primary
    "button-delete": "red", //primary
    "button-success": "green", //primary
    "button-flat": "gray", //primary

    "input-color": "brown",
  },
};

export const MUIThemes = {
  classic: createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#1e90ff !important",
      },
      text: {
        base: "black !important",
        inverted: "white !important",
        alt: "#808080 !important",
      },
      highlight: {
        main: "#1e90ff !important",
        light: "#75b3f0 !important",
      },
      background: {
        primary: "white !important",
        inverted: "black !important",
      },
      pane: { main: "#fff !important" },
      card: { main: "#1e90ff !important" },
      panel: {
        main: "#eee !important",
        darker: "#888 !important",
      },
      "flat-button": {
        main: "#000 !important",
      },
      "cart-btn": {
        main: "#000 !important",
        light: "#101010 !important",
        contrastText: "#fff !important",
      },
      input: {
        main: "#1e90ff !important",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
      },
    },
  }),
  moonlit: createTheme({
    ["theme-type"]: "dark",
    palette: {
      primary: {
        main: "#1e90ff !important",
      },
      text: {
        base: "white !important",
        inverted: "white !important",
        alt: "#68abee !important",
      },
      highlight: {
        main: "#1e90ff !important",
        light: "#75b3f0 !important",
      },
      background: {
        primary: "#072440 !important",
        inverted: "#041525 !important",
        card: "dodgerblue !important",
        panel: "#aaa !important",
      },
      pane: {
        main: "#092c4e !important",
      },
      card: { main: "#1e90ff !important" },
      panel: {
        main: "#092c4e !important",
        border: "#030d17 !important",
      },
      "flat-button": {
        main: "#68abee !important",
      },
      "cart-btn": {
        main: "#1e90ff !important",
        light: "#71b0ef !important",
        dark: "#1467b8 !important",
        contrastText: "#fff !important",
      },
      input: {
        main: "#1e90ff !important",
        light: "#68abee !important",
        dark: "#68abee !important",
        border: "#68abee !important",
      },
    },
  }),
  dawn: createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#A27B5C !important",
      },
      text: {
        base: "#2C3639 !important",
        inverted: "#DCD7C9 !important",
        alt: "#6f543e !important",
      },
      highlight: {
        main: "#A27B5C !important",
        light: "#ab8669 !important",
      },
      background: {
        primary: "#DCD7C9 !important",
        inverted: "#3F4E4F !important",
        card: "dodgerblue !important",
        panel: "#aaa !important",
      },
      pane: {
        main: "#d7d1c1 !important",
      },
      card: {
        main: "#A27B5C !important",
      },
      panel: {
        main: "#d7d1c1 !important",
        border: "#b7ac8f !important",
      },
      "flat-button": {
        main: "#3F4E4F !important",
      },
      "cart-btn": {
        main: "#A27B5C !important",
        light: "#b99b83 !important",
        dark: "#8c6a4f !important",
        contrastText: "#fff !important",
      },
      input: {
        main: "#6f543e !important",
        light: "#3F4E4F !important",
        dark: "#3F4E4F !important",
        border: "#6f543e !important",
      },
    },
  }),
  autumn: createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#7A9D54 !important",
      },
      text: {
        base: "#192f19 !important",
        inverted: "#DCD7C9 !important",
        alt: "#6f543e !important",
      },
      highlight: {
        main: "#A27B5C !important",
        light: "#ab8669 !important",
      },
      background: {
        primary: "#FAE392 !important",
        inverted: "#1A5D1A !important",
      },
      pane: {
        main: "#f9e085 !important",
      },
      card: {
        main: "#7A9D54 !important",
      },
      panel: {
        main: "#e5c658 !important",
        border: "#e5c658 !important",
      },
      "flat-button": {
        main: "#1A5D1A !important",
      },
      "cart-btn": {
        main: "#A27B5C !important",
        light: "#b99b83 !important",
        dark: "#8c6a4f !important",
        contrastText: "#fff !important",
      },
      input: {
        main: "#1A5D1A !important",
        light: "#227722 !important",
        dark: "#124012 !important",
        border: "#1A5D1A !important",
      },
    },
  }),
  vibrant: createTheme({
    ["theme-type"]: "dark",
    palette: {
      primary: {
        main: "#7752FE !important",
      },
      text: {
        base: "#fff !important",
        inverted: "#fff !important",
        alt: "#E5CFF7 !important",
      },
      highlight: {
        main: "#BEADFA !important",
        light: "#D0BFFF !important",
      },
      background: {
        primary: "#190482 !important",
        inverted: "#7752FE !important", //"#8E8FFA",
      },
      pane: {
        main: "#1e059e !important",
      },
      card: {
        main: "#9376fe !important", //"#7752FE",
      },
      panel: {
        main: "#1e059e !important",
        border: "#1e059e !important",
      },
      "flat-button": {
        main: "#8E8FFA !important",
      },
      "cart-btn": {
        main: "#8E8FFA !important",
        // light: "#",
        // dark: "#",
        contrastText: "#fff !important",
      },
      input: {
        main: "#7752FE !important",
        light: "#8E8FFA !important",
        dark: "#7752FE !important",
        border: "#7752FE !important",
      },
    },
  }),
  "red-white": createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#F8485E !important",
      },
      text: {
        base: "#512D6D !important",
        inverted: "#fff !important",
        alt: "#F8485E !important",
      },
      highlight: {
        main: "#D77FA1 !important",
        light: "#E6B2C6 !important",
      },
      background: {
        primary: "#EEEEEE !important",
        inverted: "#F8485E !important", //"#8E8FFA",
      },
      pane: {
        main: "#FEF6FB !important",
      },
      card: {
        main: "#F8485E !important", //"#7752FE",
      },
      panel: {
        main: "#FEF6FB !important",
        border: "#FAEDF0 !important",
      },
      "flat-button": {
        main: "#512D6D !important",
      },
      "cart-btn": {
        main: "#512D6D !important",
        // light: "#",
        // dark: "#",
        contrastText: "#512D6D !important",
      },
      input: {
        main: "#512D6D !important",
        light: "#512D6D !important",
        dark: "#512D6D !important",
        border: "#512D6D !important",
      },
    },
  }),
  "brilliant-red": createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#F8485E !important",
      },
      text: {
        base: "#000 !important",
        inverted: "#fff !important",
        alt: "#F8485E !important",
      },
      highlight: {
        main: "#D77FA1 !important",
        light: "#E6B2C6 !important",
      },
      background: {
        primary: "#ffffff !important",
        inverted: "#FF0000 !important", //"#8E8FFA",
      },
      pane: {
        main: "#ffffff !important",
      },
      card: {
        main: "#F8485E !important", //"#7752FE",
      },
      panel: {
        main: "#ffffff !important",
        border: "#FAEDF0 !important",
      },
      "flat-button": {
        main: "#512D6D !important",
      },
      "cart-btn": {
        main: "#ff0000 !important",
        // light: "#",
        // dark: "#",
        contrastText: "#ffffff !important",
      },
      input: {
        main: "#512D6D !important",
        light: "#512D6D !important",
        dark: "#512D6D !important",
        border: "#512D6D !important",
      },
    },
  }),
};

const empty = {
  palette: {
    primary: {
      main: "#",
    },
    text: {
      base: "#",
      inverted: "#",
      alt: "#",
    },
    highlight: {
      main: "#",
      light: "#",
    },
    background: {
      primary: "#",
      inverted: "#",
    },
    pane: {
      main: "#",
    },
    card: {
      main: "#",
    },
    panel: {
      main: "#",
      border: "#",
    },
    "flat-button": {
      main: "#",
    },
    "cart-btn": {
      main: "#",
      light: "#",
      dark: "#",
      contrastText: "#",
    },
    input: {
      main: "#",
      light: "#",
      dark: "#",
      border: "#",
    },
  },
};
