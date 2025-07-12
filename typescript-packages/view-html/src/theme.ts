export type Theme = 'light' | 'dark' | 'sepia';

export type SetThemeOptions = {
  theme: Theme;
  element?: Element;
  selector?: string;
  storageKey?: string;
};

export const THEME_STORE_KEY = 'book-box-theme';

function getBookboxNodes(options: SetThemeOptions) {
  const { element, selector = '.book-box' } = options ?? {};
  if (element) return [element];
  return Array.from(document.querySelectorAll(selector));
}

const themeClassNames = {
  light: '',
  dark: 'book-box_theme-dark',
  sepia: 'book-box_theme-sepia',
}

export function setTheme(options: SetThemeOptions) {
  const { theme, storageKey } = options;
  for (const node of getBookboxNodes(options)) {
    for (const t of Object.keys(themeClassNames)) {
      const className = themeClassNames[t as Theme];
      if (t === theme) {
        if (className) node.classList.add(className);
      } else if (className !== '') {
        node.classList.remove(className);
      }
    }
  }
  localStorage.setItem(storageKey ?? THEME_STORE_KEY, theme);
}

/**
 * set theme from localStorage
 */
export function setSavedTheme(options?: Omit<SetThemeOptions, 'theme'> & { storageKey?: string }) {
  const { storageKey } = options ?? {};
  const savedTheme = localStorage.getItem(storageKey ?? THEME_STORE_KEY);
  if (!savedTheme) return;
  if (!themeClassNames.hasOwnProperty(savedTheme)) return;
  setTheme({ theme: savedTheme as Theme, ...(options ?? {}) });
}
