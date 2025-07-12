import { gotoKey } from '../goto';
import { getCurrentPage } from '../navigation';
import { setTheme } from '../theme';

declare global {
  interface Window {
    bbx: {
      gotoKey: typeof gotoKey;
      setTheme: typeof setTheme;
      getCurrentPage: typeof getCurrentPage,
    };
  }
}

/**
 * global functions
 */
export function setGlobalActions() {
  window.bbx = {
    gotoKey,
    setTheme,
    getCurrentPage,
  };
}
