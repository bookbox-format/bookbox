import { readFileSync, writeFileSync } from "fs";

const htmlText = readFileSync("./dist/index.html").toString();

writeFileSync(
  "../src/bookTemplate.ts",
  `export const BOOK_TEMPLATE_HTML = \`${htmlText.replace(/`/g, '\\`').replace(/\${/g, '\\${').replace(/content:"\\/g, 'content:"\\u')}\`;`
);
