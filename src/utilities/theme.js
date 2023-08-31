import { setThemeSlice } from "../state/theme/themeSlice";

let styles = require("../styles.json");

// function for returning the theme from the local storage
export const getTheme = () => {
  let theme = window.localStorage.getObject("theme") || "dark";

  if (window.localStorage.getObject("theme") === undefined) {
    setTheme("dark");
  }

  return styles[theme];
};

// function for setting the theme in the local storage
export const setTheme = (theme, dispatch) => {
  window.localStorage.setObject("theme", theme);
  // change the theme in the app theme slice

  dispatch(setThemeSlice(theme));
};
