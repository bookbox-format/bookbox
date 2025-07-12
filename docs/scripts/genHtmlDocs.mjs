import {
  html,
  bbm,
  markup,
} from '@bookbox/preset-web';
import { readFileSync, writeFileSync } from 'fs';

const schema = JSON.parse(readFileSync('./dist/docs.json').toString());

const bracket = text => `<span class="hljs-keyword">${text}</span>`;
function colorizedBlock(block) {
  if (block.text) {
    return block.text.replace(/\\./g, g => `<span class="hljs-built_in">${g}</span>`);
  }
  if (block.error) {
    return htmlSynteticElements.error({
      name: 'bbm',
      error: block.error.value,
      props: { message: block.error.message },
    })({});
  }
  if (block.include) {
    return `<span class="hljs-string">{{${block.include.value}}}</span>`;
  }
  if (block.tag) {
    const { body, attrList, name, separator } = block.tag;
    return `${bracket('{')}<span class="hljs-subst">${name}</span>${attrList
      .map(
        attr =>
          `.<span class="hljs-number">${attr.name}</span>${
            attr.empty ? '' : `${bracket('{')}<span class="hljs-string">${attr.value}</span>${bracket('}')}`
          }`,
      )
      .join('')}${separator}${body.blocks.map(block => colorizedBlock(block)).join('')}${bracket('}')}`;
  }
}

function renderColorBbm(text) {
  const ast = markup.parse(text.trim());

  return ast.blocks.map(block => colorizedBlock(block)).join('');
}

const elements = html.useHtmlElements({ renderColorCode: p => renderColorBbm(p.text) });

const bookData = html.createHtmlBook({
  schema,
  externalBuilder: {
    mermaid: {
      local:
        ({ key }) =>
        ({ store }) => {
          const rawChildren = store.elementsByKeys[key];
          return `<div class="mermaid">${rawChildren.children.join('')}</div>`;
        },
    },
    bbm: {
      local:
        ({ key }) =>
        ({ store }) => {
          return elements.code({ key, lang: 'bbm' })({ store });
        },
    },
  },
});

writeFileSync(
  './dist/docs.html',
  html.getBookBoxHtmlDocument({
    bookData,
    inlineHead: `
<script async src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script async >mermaid.initialize({ startOnLoad: true });</script>
`,
  }),
);
