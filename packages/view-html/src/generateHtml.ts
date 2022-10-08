import { BOOK_TEMPLATE_HTML } from "./bookTemplate";
import { getBookBoxHtmlSettings } from "./htmlBookSettings";
import { BookBoxHtmlParams, HtmlToken, listToHtml } from "./model";

export const fillDocumentTemplate = ({
  title,
  book,
  fontStyle,
  inlineHead,
}: {
  title: HtmlToken;
  book: HtmlToken;
  fontStyle: HtmlToken;
  inlineHead?: HtmlToken;
}) =>
  BOOK_TEMPLATE_HTML.replace("%TITLE", title)
    .replace("%INLINE_HEAD", inlineHead ?? "")
    .replace("%BOOK", book)
    .replace("%FONT_STYLE", fontStyle);

export function getBookBoxHtml({ bookData }: BookBoxHtmlParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  return `<div class="book-box book-box_layout">
    ${getBookBoxHtmlSettings({ bookData })}
    <div class="book-box_content">
        <div>${listToHtml(tokens)}</div>
    </div>
</div>`;
}

function getFontStyle({ bookData }: BookBoxHtmlParams): HtmlToken {
  return "";
}

export function getBookBoxHtmlDocument({
  bookData,
  inlineHead,
}: BookBoxHtmlParams & { inlineHead?: HtmlToken }): HtmlToken {
  const { tokens, meta, store } = bookData;
  const bookHtml = getBookBoxHtml({ bookData });
  const fontStyle = getFontStyle({ bookData });
  // <- all languages
  return fillDocumentTemplate({
    title: meta.contents[0].text,
    book: bookHtml,
    fontStyle: "",
    inlineHead,
  });
}
