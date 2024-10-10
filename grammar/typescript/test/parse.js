import { getTokens, parse, stringify } from '../dist/index.js';
import fs from 'node:fs';

const text = fs.readFileSync('./text.bbm', { encoding: 'utf-8' });
// console.log(getTokens(text));
fs.writeFileSync('./ast.json', JSON.stringify(parse(text), null, 2));
console.log(stringify(parse(text)));
