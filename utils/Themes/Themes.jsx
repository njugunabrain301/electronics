import { createTheme } from "@mui/material";

export const MUIThemes = {
  classic: createTheme({
    ["theme-type"]: "light",
    palette: {
      primary: {
        main: "#1e90ff !important",
      },
      text: {
        base: "black",
        inverted: "white",
        alt: "#808080",
      },
      highlight: {
        main: "#1e90ff",
        light: "#75b3f0",
      },
      background: {
        primary: "white",
        inverted: "black",
      },
      pane: { main: "#fff" },
      card: { main: "#1e90ff" },
      panel: {
        main: "#eee",
        darker: "#888",
      },
      "flat-button": {
        main: "#000",
      },
      "cart-btn": {
        main: "#000 !important",
        light: "#101010",
        contrastText: "#fff",
      },
      input: {
        main: "#1e90ff",
      },
      "input-inverted": {
        main: "white",
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
        base: "white",
        inverted: "white",
        alt: "#68abee",
      },
      highlight: {
        main: "#1e90ff",
        light: "#75b3f0",
      },
      background: {
        primary: "#072440",
        inverted: "#041525",
        card: "dodgerblue",
        panel: "#aaa",
      },
      pane: {
        main: "#092c4e",
      },
      card: { main: "#1e90ff" },
      panel: {
        main: "#092c4e",
        border: "#030d17",
      },
      "flat-button": {
        main: "#68abee",
      },
      "cart-btn": {
        main: "#1e90ff !important",
        light: "#71b0ef",
        dark: "#1467b8",
        contrastText: "#fff",
      },
      input: {
        main: "#1e90ff",
        light: "#68abee",
        dark: "#68abee",
        border: "#68abee",
      },
      "input-inverted": {
        main: "white",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
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
        base: "#2C3639",
        inverted: "#DCD7C9",
        alt: "#6f543e",
      },
      highlight: {
        main: "#A27B5C",
        light: "#ab8669",
      },
      background: {
        primary: "#DCD7C9",
        inverted: "#3F4E4F",
        card: "dodgerblue",
        panel: "#aaa",
      },
      pane: {
        main: "#d7d1c1",
      },
      card: {
        main: "#A27B5C",
      },
      panel: {
        main: "#d7d1c1",
        border: "#b7ac8f",
      },
      "flat-button": {
        main: "#3F4E4F",
      },
      "cart-btn": {
        main: "#A27B5C !important",
        light: "#b99b83",
        dark: "#8c6a4f",
        contrastText: "#fff",
      },
      input: {
        main: "#6f543e",
        light: "#3F4E4F",
        dark: "#3F4E4F",
        border: "#6f543e",
      },
      "input-inverted": {
        main: "#DCD7C9",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
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
        base: "#192f19",
        inverted: "#DCD7C9",
        alt: "#6f543e",
      },
      highlight: {
        main: "#A27B5C",
        light: "#ab8669",
      },
      background: {
        primary: "#FAE392",
        inverted: "#1A5D1A",
      },
      pane: {
        main: "#f9e085",
      },
      card: {
        main: "#7A9D54",
      },
      panel: {
        main: "#e5c658",
        border: "#e5c658",
      },
      "flat-button": {
        main: "#1A5D1A",
      },
      "cart-btn": {
        main: "#A27B5C !important",
        light: "#b99b83",
        dark: "#8c6a4f",
        contrastText: "#fff",
      },
      input: {
        main: "#1A5D1A",
        light: "#227722",
        dark: "#124012",
        border: "#1A5D1A",
      },
      "input-inverted": {
        main: "#DCD7C9",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
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
        base: "#fff",
        inverted: "#fff",
        alt: "#E5CFF7",
      },
      highlight: {
        main: "#BEADFA",
        light: "#D0BFFF",
      },
      background: {
        primary: "#190482",
        inverted: "#7752FE", //"#8E8FFA",
      },
      pane: {
        main: "#1e059e",
      },
      card: {
        main: "#9376fe", //"#7752FE",
      },
      panel: {
        main: "#1e059e",
        border: "#1e059e",
      },
      "flat-button": {
        main: "#8E8FFA",
      },
      "cart-btn": {
        main: "#8E8FFA !important",
        // light: "#",
        // dark: "#",
        contrastText: "#fff",
      },
      input: {
        main: "#7752FE",
        light: "#8E8FFA",
        dark: "#7752FE",
        border: "#7752FE",
      },
      "input-inverted": {
        main: "#fff",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
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
        base: "#512D6D",
        inverted: "#fff",
        alt: "#F8485E",
      },
      highlight: {
        main: "#D77FA1",
        light: "#E6B2C6",
      },
      background: {
        primary: "#EEEEEE",
        inverted: "#F8485E", //"#8E8FFA",
      },
      pane: {
        main: "#FEF6FB",
      },
      card: {
        main: "#F8485E", //"#7752FE",
      },
      panel: {
        main: "#FEF6FB",
        border: "#FAEDF0",
      },
      "flat-button": {
        main: "#512D6D",
      },
      "cart-btn": {
        main: "#512D6D !important",
        // light: "#",
        // dark: "#",
        contrastText: "#ffffff",
      },
      input: {
        main: "#512D6D",
        light: "#512D6D",
        dark: "#512D6D",
        border: "#512D6D",
      },
      "input-inverted": {
        main: "#fff",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
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
        base: "#000",
        inverted: "#fff",
        alt: "#F8485E",
      },
      highlight: {
        main: "#D77FA1",
        light: "#E6B2C6",
      },
      background: {
        primary: "#ffffff",
        inverted: "#FF0000", //"#8E8FFA",
      },
      pane: {
        main: "#ffffff",
      },
      card: {
        main: "#F8485E", //"#7752FE",
      },
      panel: {
        main: "#ffffff",
        border: "#FAEDF0",
      },
      "flat-button": {
        main: "#512D6D",
      },
      "cart-btn": {
        main: "#ff0000 !important",
        // light: "#",
        // dark: "#",
        contrastText: "#ffffff",
      },
      input: {
        main: "#512D6D",
        light: "#512D6D",
        dark: "#512D6D",
        border: "#512D6D",
      },
      "input-inverted": {
        main: "#fff",
      },
      success: {
        main: "#2e7d32 !important",
      },
      error: {
        main: "#d32f2f !important",
      },
    },
  }),
};
