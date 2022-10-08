import { BookApi, getBookSchema } from "@bookbox/generator-js";
import { writeFileSync } from "fs";
import { createHtmlBook, getBookBoxHtmlDocument } from "../src";

export const elementsListBook = (_: BookApi) => _.book.root`
${_.title`Examples: elements`}

${_.authors`author1, author2, author3`}


${_.header.level(2)`Header level 2`}


${_.strong`Strong`}


${_.em`Em`}


${_.code.lang("javascript")`const x = 1 + Math.random();`}

${_.code.lang("javascript")`const x = 'longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong'`}

${_.code.lang('typescript').key("code")`
import { HtmlToken } from "./model";
import hljs from 'highlight.js';

interface CodeOptions {
  text: string;
  lang?: string;
}

export function renderColorCode(options: CodeOptions): HtmlToken {
  const {text, lang} = options;
  let preparedCode = text;
  if (lang) {
      try {
        preparedCode = hljs.highlight(preparedCode, {language: lang}).value;
      } finally {}
  }
  return preparedCode;
}
`}

${_.code.lang('html')`
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>%TITLE</title>
    <link rel="stylesheet" href="./htmlBook.css" />
    <link rel="stylesheet" href="./code.css" />
    <link rel="stylesheet" href="./lib/katex.css" />
    %FONT_STYLE
    <script src="./prepare.ts" type="module"/>
    %INLINE_HEAD
  </head>
  <body>
    %BOOK
  </body>
</html>
`}

${_.code.lang('json')`
{
    "copy": [
      "src/bookTemplate.html",
      "src/htmlBook.css",
      "src/code.css",
      "src/prepare.ts",
      "src/goto.ts",
      "src/navigation.ts",
      "node_modules/katex/dist"
    ],
    "targets": {
      "bookTemplate.html": "index.html"
    }
}
`}

${_.code.lang('css')`
.book-box_theme-dark {
    --book-box-color-code-type: var(--book-box-color-name-yellow-light);
    --book-box-color-code-variable-constant: var(--book-box-color-name-yellow-light);
    --book-box-color-code-class: var(--book-box-color-name-yellow-light);
}

.book-box-code code {
    color: var(--book-box-color-text);
    white-space: pre-wrap;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    tab-size: 4;
    hyphens: none;
}
`}


${_.tooltip.content("tooltip text")`tooltip label`}


${_.label.ref("code")`label`}


${_.link.href("https://yandex.ru")`yandex link`}


${_.math.block()`a^n + b^{n^n} = c^n`}
${_.math.block()`\\sqrt{2}`}


${_.draft`draft`}


${_.external`external`}


${_.image.src("image.svg").alt("test image")`image`}


${_.video.src("video.mp4")``}


${_.audio.src("audio.mp3")``}


${_.list.order()`
${_.item`item a`}
${_.item`item b`}
${_.item`item c`}
`}


${_.separator``}
`;

const { schema } = getBookSchema({ book: elementsListBook });
const bookData = createHtmlBook({ schema });

writeFileSync("./elements-list.json", JSON.stringify(bookData, null, 2))
writeFileSync("./elements-list.html", getBookBoxHtmlDocument({ bookData }));
