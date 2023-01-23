import { writeFileSync } from 'fs';

export function writeCssTs(name, text, dir = '') {
  const escapedText = text.replace('`', '\\`').replace('$', '\\$');
  const size = Math.ceil(escapedText.length / 1000);
  const textList = new Array(size).fill('').map((_, i) => escapedText.slice(i*1000, (i+1)*1000));
  writeFileSync(
    `../src/generated/${dir}${dir ? '/' : ''}${name}_css.ts`,
    `export const ${name}CssText = [${textList.map(e => `\`${e}\``).join(',\n')}].join('')`,
  );
}
