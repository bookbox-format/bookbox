import { getTokens, parse, stringify } from '../dist/index.js';
import fs from 'node:fs';
import { diffLines } from 'diff';

const text = fs.readFileSync('./text.bbm', { encoding: 'utf-8' });

fs.writeFileSync('./ast.json', JSON.stringify(parse(text), null, 2));

console.log(diffLines(text, stringify(parse(text))).filter(item => item.added || item.removed));

const example = `
just string

{a.href{ya.ru} ya}
`;

console.log(JSON.stringify(parse(example), null, 2));
