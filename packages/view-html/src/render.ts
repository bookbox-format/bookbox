import { BookBoxHtmlGenerateParams } from './model';
import { getBookBoxHtml } from './generateHtml';
import { getCurrentPage, getNavigation } from './navigation';
import { gotoKey } from './goto';
import { setSavedTheme } from './theme';

export type RenderOptions = BookBoxHtmlGenerateParams & {
  element: Element;
};

export function render({ element, bookData, layoutOptions, settingsOptions }: RenderOptions) {
  const html = getBookBoxHtml({ bookData, layoutOptions, settingsOptions });
  element.innerHTML = html;
  setSavedTheme({ element: element.querySelector('.book-box') ?? undefined });

  const { observeNavigation, disconnectNavigation } = getNavigation(element);

  const navigationRegistry = new FinalizationRegistry(() => {
    disconnectNavigation();
  });

  navigationRegistry.register(element, undefined);

  const initialPage = getCurrentPage();

  window.setTimeout(() => {
    if (initialPage !== null) {
      gotoKey(`page-${initialPage}`);
    }
    observeNavigation();
  }, 100);
}
