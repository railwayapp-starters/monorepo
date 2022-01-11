const colors = require("tailwindcss/colors");

const customColors = {
  bg: "#faeee7",
  fg: "#33272a",
  article: "#594a4e",
  accent: "#ff8ba7",
  accentDim: "#ffc6c7",
  gray: "#8b9198",
  dim: "#c3f0ca",
};

module.exports = {
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      sans: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
    },
    colors: {
      ...colors,
      ...customColors,
    },
  },
  variants: {},
};
