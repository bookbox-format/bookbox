import { Attribute, Body } from '../generated';

function stringifyAttr(attr: Attribute): string {
  const { name, value, empty } = attr;
  const body = empty ? '' : `{${value}}`;
  return `.${name}${body}`;
}

export function stringify(body: Body): string {
  return body.blocks
    .map(block => {
      if (block.text) return block.text;
      if (block.include) return `{{${block.include.value}}}`;
      if (block.tag) {
        const { attrList, body, name, separator } = block.tag;
        const attrs = attrList.map(stringifyAttr).join('');
        const tagBody = body ? stringify(body) : '';
        return `{${name}${attrs}${separator}${tagBody}}`;
      }
    })
    .join('');
}
