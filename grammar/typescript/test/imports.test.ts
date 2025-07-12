import { resolve } from 'node:path';
import { readMarkup, stringify } from '../src';

test('check imports', async () => {
  console.time('readMakrup');
  const body = await readMarkup(resolve(__dirname, './imports.bbm'));
  console.timeEnd('readMakrup');
  expect(body).toMatchSnapshot();
  expect(stringify(body)).toMatchSnapshot();
});
