// only for browser

import { goto, gotoKey } from "./goto";
import { getNavigation } from "./navigation";

declare global {
  interface Window {
    goto(selector: string): void;
    gotoKey(key: string): void;
  }
}

window.goto = goto;
window.gotoKey = gotoKey;

const themeKey = "book-box-theme";
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) {
    const root = document.querySelector(".book-box");
    if (root) {
      if (savedTheme === "dark") {
        root.classList.add("book-box_theme-dark");
      } else {
        root.classList.remove("book-box_theme-dark");
      }
    }
  }
  const {observeNavigation} = getNavigation();
  observeNavigation();
});
