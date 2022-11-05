import { createHtmlBook, getBookBoxHtmlDocument } from "@bookbox/preset-web";
import { readFileSync, writeFileSync } from "fs";

const schema = JSON.parse(readFileSync("./dist/docs.json").toString());

const bookData = createHtmlBook({
  schema,
  externalBuilder: {
    mermaid: {
      local:
        ({ key }) =>
        ({ store }) => {
          const rawChildren = store.elementsByKeys[key];
          return `<div class="mermaid">${rawChildren.children.join("")}</div>`;
        },
    },
  },
});

writeFileSync(
  "./dist/docs.html",
  getBookBoxHtmlDocument({
    bookData,
    inlineHead: `
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>
`,
  })
);
