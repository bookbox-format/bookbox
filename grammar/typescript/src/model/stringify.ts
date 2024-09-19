import { Body } from '../generated';

export function stringify(body: Body): string {
  return body.blocks
    .map(block => {
      if (block.text) return block.text;
      if (block.include) return `{{${block.include.value}}}`;
      if (block.tag) {
        const attrs = block.tag.attrList.map(attr => `.${attr.name}{${attr.value}}`);
        const tagBody = block.tag.body ? stringify(block.tag.body) : '';
        return `{${block.tag.name}${attrs} ${tagBody}}`;
      }
    })
    .join('');
}
