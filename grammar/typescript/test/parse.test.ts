import fs from 'node:fs';
import { diffLines } from 'diff';
import { parse, stringify } from '../src';
import { resolve } from 'node:path';

test('correct parsing', () => {
  const text = fs.readFileSync(resolve(__dirname, './text.bbm'), { encoding: 'utf-8' });

  const ast = parse(text);
  expect(ast).toMatchSnapshot();

  expect(diffLines(text, stringify(ast)).filter(item => item.added || item.removed)).toEqual([]);
});
