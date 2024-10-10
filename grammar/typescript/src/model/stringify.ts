import { Body } from '../generated';

export function stringify(body: Body): string {
  return body.blocks
    .map(block => {
      if (block.text) return block.text;
      if (block.include) return `{{${block.include.value}}}`;
      if (block.tag) {
        const { attrList, body, name, separator } = block.tag;
        const attrs = attrList.map(attr => `.${attr.name}{${attr.value}}`);
        const tagBody = body ? stringify(body) : '';
        return `{${name}${attrs}${separator}${tagBody}}`;
      }
    })
    .join('');
}
