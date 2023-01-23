# @bookbox/view-html

```
npm i @bookbox/view-html
```

## Usage

### Browser
Styles and initial script for the browser must be connected separately.

The connection method is different for bundlers and native technologies.


With webpack/vite/...
```typescript
// index.ts
import { css, browserInit } from '@bookbox/view-html';

// init command
browserInit();

// only if you use code blocks
css.code();

// only if you use mathematical formulas
css.math();
```


Without bundlers in index.html
```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <!-- '@bookbox/view-html/dist/styles/htmlBook.css -->
    <link rel="stylesheet" href="/path/to/htmlBook.css" />

    <!-- '@bookbox/view-html/dist/styles/code.css -->
    <link rel="stylesheet" href="/path/to/code.css" />

    <!-- 'katex/dist/katex.css -->
    <link rel="stylesheet" href="/path/to/katex.css" />

    <!-- browserInit(); -->
    <script src="/path/to/index_with_browserInit.js" type="module"/>
  </head>
  ...
```

Create book:
```typescript
import { FBook, getBookSchema } from "@bookbox/generator-js";
import { createHtmlBook, getBookBoxHtmlDocument, render } from "@bookbox/view-html";

export const exampleBook: FBook = ({book, title, math}) => book.root`
${title`exampleBook`}

${math`E = mc^2`}
`;

const { schema } = getBookSchema({ book: exampleBook });

render({ element: document.body, bookData: createHtmlBook({ schema }) });

```

### NodeJS
Styles and initial scripts for NodeJS are already contained in the html document template.
Styles for code and math will be included in the document automatically, depending on the use of code or math elements.

In NodeJS with typescript and modules
```typescript
import { writeFileSync } from "fs";
import { FBook, getBookSchema } from "@bookbox/generator-js";
import { createHtmlBook, getBookBoxHtmlDocument } from "@bookbox/view-html";

export const exampleBook: FBook = ({book, title, math}) => book.root`
${title`exampleBook`}

${math`E = mc^2`}
`;

const { schema } = getBookSchema({ book: exampleBook });
const bookData = createHtmlBook({ schema });

writeFileSync("output.html", getBookBoxHtmlDocument({ bookData }));

```

In NodeJS without modules
```javascript
const { writeFileSync } = require("fs");
const { getBookSchema } = require("@bookbox/generator-js");
const { createHtmlBook, getBookBoxHtmlDocument } = require("@bookbox/view-html");

export const exampleBook = ({book, title, math}) => book.root`
${title`exampleBook`}

${math`E = mc^2`}
`;

const { schema } = getBookSchema({ book: exampleBook });
const bookData = createHtmlBook({ schema });

writeFileSync("output.html", getBookBoxHtmlDocument({ bookData }));

```
