import { BookData } from '@bookbox/core';

export type HtmlToken = string;

export const listToHtml = (children: HtmlToken[]): HtmlToken => children.map(item => item).join('');

export type BookBoxHtmlParams = {
  bookData: BookData<HtmlToken>;
};

export type BookBoxSettingsParams = {
  viewTumbler?: boolean;
  design?: boolean;
  media?: boolean;
  contents?: boolean;
};

export type BookBoxLayoutParams = {
  fullPage?: boolean;
};

export type BookBoxHtmlGenerateParams = BookBoxHtmlParams & {
  settingsOptions?: BookBoxSettingsParams;
  layoutOptions?: BookBoxLayoutParams;
};
