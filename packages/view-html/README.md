# @bookbox/view-html

```
npm i @bookbox/view-html
```

## Usage

In browser with typescript
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
