import { BookData } from '@bookbox/core';

export type HtmlToken = string;

/**
 * normalize space
 */
export const listToHtml = (children: HtmlToken[]): HtmlToken => {
  const result: string[] = [];
  for (const child of children) {
    if (/^\s/.test(child)) {
      if (result.at(-1) !== ' ') {
        result.push(' ');
      }
    }
    result.push(child.trim());
    if (/\s$/.test(child)) {
      result.push(' ');
    }
  }
  return result.join('');
}

export type BookBoxHtmlParams = {
  bookData: BookData<HtmlToken>;
};

export type BookBoxNavigationItem = {
  key: string;
  value: HtmlToken[];
  level?: number;
};

export type BookBoxSettingsParams = {
  viewTumbler?: boolean;
  viewItems?: boolean;
  design?: boolean;
  media?: boolean;
  contents?: boolean;
  custom?: Record<
    string,
    {
      icon: HtmlToken;
      getItems(params: BookBoxHtmlParams): BookBoxNavigationItem[];
    }
  >;
};

export type BookBoxLayoutParams = {
  fullPage?: boolean;
};

export type BookBoxHtmlGenerateParams = BookBoxHtmlParams & {
  settingsOptions?: BookBoxSettingsParams;
  layoutOptions?: BookBoxLayoutParams;
};
