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