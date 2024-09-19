import { getNavigation } from '../navigation';
import { setSavedTheme } from '../theme';
import { setGlobalActions } from './globalActions';

export function htmlDocumentInit() {
  setGlobalActions();

  // after loading
  document.addEventListener('DOMContentLoaded', () => {
    setSavedTheme();
    const { observeNavigation } = getNavigation();
    // start without finish
    observeNavigation();
  });
}
