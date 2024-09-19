# @bookbox/preset-web

Preset from the package list:
- [@bookbox/core](https://www.npmjs.com/package/@bookbox/core)
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
    createHtmlBook, // view-html
    getBookBoxHtmlDocument, // view-html
    FBook, // generator-js
    core // all from core
} from "@bookbox/preset-web";

const iterableBook: Iterable<core.BookItem> // types from core
  = core.getIterableBook(['text']); // functions from core
```

## Usage

```ts
import { css, browserInit, FBook, getBookSchema, render } from '@bookbox/preset-web';

// init command
browserInit();

// only if you use code blocks
css.code();

// only if you use mathematical formulas
css.math();

// create book
export const book: FBook = _ => _.book.root`
${_.title`exampleBook`}

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Fusce urna velit, imperdiet ac diam a, sollicitudin gravida tellus.
In hac habitasse platea dictumst. Vestibulum tempus arcu sed molestie volutpat.
Praesent ante purus, suscipit eget nunc non, rutrum ullamcorper nulla.
Aliquam quis luctus quam, in malesuada purus.
Nullam venenatis leo at iaculis finibus.
Sed feugiat nibh felis, at maximus nibh pellentesque in.
Aenean nunc massa, aliquet id accumsan non, pharetra at magna.
Cras luctus velit et lorem fringilla mattis.
Suspendisse tristique aliquam ligula a congue.
Nullam accumsan orci auctor sapien venenatis, eu interdum eros mattis.


${_.separator}

${_.math`E = mc^2`}

${_.code.lang('typescript')`
const tools = [];
tools.push('book-box');
`}
`;

const { schema } = getBookSchema({ book });

// render html in target element
render({
  element: document.body,
  bookData: createHtmlBook({ schema })
});
```