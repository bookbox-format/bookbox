import { BookElements, BookStore } from '@bookbox/core';
import { BOOK_TEMPLATE_HTML } from './generated/bookTemplate';
import { getBookBoxHtmlSettings } from './htmlBookSettings';
import { BookBoxHtmlGenerateParams, BookBoxHtmlParams, HtmlToken, listToHtml } from './model';
import { katexCssText } from './generated/katex_css';
import { katexFontsAllCssText } from './generated/katexFontsAll_css';
import { codeCssText } from './generated/code_css';

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
  BOOK_TEMPLATE_HTML.replace('%TITLE', title)
    .replace('%INLINE_HEAD', inlineHead ?? '')
    .replace('%BOOK', book)
    .replace('%FONT_STYLE', fontStyle);

export function getBookBoxHtml({ bookData, settingsOptions, layoutOptions }: BookBoxHtmlGenerateParams): HtmlToken {
  const { tokens, meta, store } = bookData;
  return `<div class="book-box book-box_layout">
    ${getBookBoxHtmlSettings({ bookData, settingsOptions, layoutOptions })}
    <div class="book-box_content">
        <div>${listToHtml(tokens)}</div>
    </div>
</div>`;
}

function getFontStyle({ bookData }: BookBoxHtmlParams): HtmlToken {
  const styles: string[] = [];
  const add = (style: string) => styles.push(`<style>${style}</style>`);
  if (exist('math')(bookData.store)) {
    add(katexCssText);
    add(katexFontsAllCssText);
  }
  if (exist('code')(bookData.store)) {
    add(codeCssText);
  }
  return styles.join('\n');
}

export function getBookBoxHtmlDocument({
  bookData,
  inlineHead,
}: BookBoxHtmlParams & {
  inlineHead?: HtmlToken;
}): HtmlToken {
  const { meta } = bookData;
  const bookHtml = getBookBoxHtml({
    bookData,
    settingsOptions: { viewTumbler: false },
    layoutOptions: { fullPage: true },
  });
  const fontStyle = getFontStyle({ bookData });
  return fillDocumentTemplate({
    title: meta.contents[0].text,
    book: bookHtml,
    fontStyle,
    inlineHead,
  });
}

// TODO: create stat in core
function exist(checkName: keyof BookElements) {
  return (store: BookStore<HtmlToken>): boolean => {
    for (const name in store.elementsByKeys) {
      if (!store.elementsByKeys.hasOwnProperty(name)) continue;
      if (store.elementsByKeys[name].name === checkName) return true;
    }
    return false;
  };
}
