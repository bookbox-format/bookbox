import { readFileSync } from 'fs';
import { writeCssTs } from './css2js.js';

const cssList = ['htmlBook.css', 'code.css'];

for (const path of cssList) {
  const name = path.match(/(\w+).css/)[1];
  const text = readFileSync(`../src/${path}`).toString();
  writeCssTs(name, text.replace(/\n/g, ''));
}
