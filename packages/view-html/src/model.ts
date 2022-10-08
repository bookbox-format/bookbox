import { BookData } from "@bookbox/core";

export type HtmlToken = string;

export const listToHtml = (children: HtmlToken[]): HtmlToken =>
    children.map(item => item).join('');

export type BookBoxHtmlParams = {
    bookData: BookData<HtmlToken>;
};
