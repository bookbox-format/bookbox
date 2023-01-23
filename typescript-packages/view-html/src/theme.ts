export type Theme = 'light' | 'dark';

export type SetThemeOptions = {
  theme: Theme;
  element?: Element;
  selector?: string;
};

export const THEME_STORE_KEY = 'book-box-theme';

function getBookboxNodes(options: SetThemeOptions) {
  const { element, selector = '.book-box' } = options ?? {};
  if (element) return [element];
  return Array.from(document.querySelectorAll(selector));
}

const darkClassName = 'book-box_theme-dark';

export function setTheme(options: SetThemeOptions) {
  const { theme } = options;
  for (const node of getBookboxNodes(options)) {
    if (theme === 'dark') node.classList.add(darkClassName);
    else node.classList.remove(darkClassName);
  }
}

/**
 * set theme from localStorage
 */
export function setSavedTheme(options?: Omit<SetThemeOptions, 'theme'> & { storageKey?: string }) {
  const { storageKey } = options ?? {};
  const savedTheme = localStorage.getItem(storageKey ?? THEME_STORE_KEY);
  if (!savedTheme) return;
  if (savedTheme !== 'dark' && savedTheme !== 'light') return;
  setTheme({ theme: savedTheme, ...(options ?? {}) });
}
