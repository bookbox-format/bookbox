import { gotoKey } from '../goto';

declare global {
  interface Window {
    gotoKey(key: string): void;
  }
}

/**
 * `gotoKey` — global function
 */
export function setGlobalActions() {
  window.gotoKey = gotoKey;
}
