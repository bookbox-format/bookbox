import { BookData } from '@bookbox/core';

export type HtmlToken = string;

export const listToHtml = (children: HtmlToken[]): HtmlToken => children.map(item => item).join('');

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
