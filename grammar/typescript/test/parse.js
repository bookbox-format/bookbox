import { parse, stringify } from '../dist/index.js';
import fs from 'node:fs';

// const text = fs.readFileSync('./text.bbm', { encoding: 'utf-8' });
const text = `
just string

{a.href{ya.ru} ya}
`;
fs.writeFileSync('./ast.json', JSON.stringify(parse(text), null, 2));
console.log(stringify(parse(text)));
