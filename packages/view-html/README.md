# @bookbox/view-html

```
npm i @bookbox/view-html
```

## Usage

### Browser
Styles and initial scripts for the browser must be connected separately.

The connection method is different for bundlers and native technologies.


With webpack/vite/...
```typescript
// index.ts

// for navigation
import '@bookbox/view-html/build/esm/prepare';

// basic styles
import '@bookbox/view-html/build/styles/htmlBook.css';

// only if you use code blocks
import '@bookbox/view-html/build/styles/code.css';

// only if you use mathematical formulas
// to explicitly import, run the command `npm i katex` or see https://katex.org/docs/browser.html
import 'katex/dist/katex.css';
```


Without bundlers in index.html
```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" href="/path/to/htmlBook.css" />
    <link rel="stylesheet" href="/path/to/code.css" />
    <link rel="stylesheet" href="/path/to/katex.css" />
    <script src="/path/to/prepare.ts" type="module"/>
  </head>
  ...
```


Create book:
```typescript
import { FBook, getBookSchema } from "@bookbox/generator-js";
import { createHtmlBook, getBookBoxHtmlDocument } from "@bookbox/view-html";

export const exampleBook: FBook = ({book, title, math}) => book.root`
${title`exampleBook`}

${math`E = mc^2`}
`;

const { schema } = getBookSchema({ book: exampleBook });
const bookData = createHtmlBook({ schema });

document.body.innerHtml = getBookBoxHtml({ bookData });

```

### NodeJS
Styles and initial scripts for NodeJS are already contained in the html document template.

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
