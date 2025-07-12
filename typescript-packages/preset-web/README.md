# @bookbox/preset-web

Preset from the package list:
- [@bookbox/core](https://www.npmjs.com/package/@bookbox/core)
- [@bookbox/markup](https://www.npmjs.com/package/@bookbox/markup)
- [@bookbox/generator-bbm](https://www.npmjs.com/package/@bookbox/generator-bbm)
- [@bookbox/generator-js](https://www.npmjs.com/package/@bookbox/generator-js)
- [@bookbox/view-html](https://www.npmjs.com/package/@bookbox/view-html)

## Install

```
npm i @bookbox/preset-web
```

## Imports
Use imports as usual, but for the core use the name `core`:

```ts
import {
    html, // view-html
    bbm, // generator-bbm
    core // all from core
} from "@bookbox/preset-web";

const iterableBook: Iterable<core.BookItem> // types from core
  = core.getIterableBook(['text']); // functions from core
```

## Usage

```ts
import { html, core, js, bbm, markup } from '@bookbox/preset-web';

// init command
html.browserInit();

// only if you use code blocks
html.css.code();

// only if you use mathematical formulas
html.css.math();

// js version
export const book: core.FBook = _ => _.book.root`
${_.title`exampleBook`}

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Fusce urna velit, imperdiet ac diam a, sollicitudin gravida tellus.
In hac habitasse platea dictumst.


${_.separator}

${_.math`E = mc^2`}

${_.code.lang('typescript')`
const tools = [];
tools.push('book-box');
`}
`;

// bbm version
const bookText = `
{title exampleBook}

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Fusce urna velit, imperdiet ac diam a, sollicitudin gravida tellus.
In hac habitasse platea dictumst.


{separator}

{{E = mc^2}}

{code.lang{typescript}
const tools = [];
tools.push('book-box');
}
`;

const jsSchema = js.getBookSchema({ book }).schema;
const bbmSchema = bbm.getBookSchema(markup.parse(bookText));

// render html in target element
html.render({
  element: document.body,
  bookData: html.createHtmlBook({ schema: bbmSchema })
  // bookData: html.createHtmlBook({ schema: jsSchema })
});
```