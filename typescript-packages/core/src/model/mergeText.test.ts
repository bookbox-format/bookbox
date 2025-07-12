import { mergeText } from './mergeText';
import { BookSchema } from './model';

test('mergeText', () => {
  const schema: BookSchema = ['a', 'b', 'c', { name: 'area', children: ['1', '2'], props: {} }, 'x', 'y'];
  expect(mergeText(schema)).toEqual(['abc', { name: 'area', children: ['12'], props: {} }, 'xy']);
});

test('merge holes', () => {
  const schema: BookSchema = [
    'a',
    'b',
    'c\n',
    { name: 'hole', children: [], props: {} },
    '\n',
    { name: 'hole', children: [], props: {} },
    { name: 'hole', children: [], props: {} },
    '\n',
    { name: 'area', children: [], props: {} },
    'x',
    'y',
  ];
  expect(mergeText(schema)).toEqual(['abc', { name: 'area', children: [], props: {} }, 'xy']);

  const schema2: BookSchema = [
    'a',
    'b',
    { name: 'area', children: [''], props: {} },
    '\n',
    { name: 'hole', children: [], props: {} },
    '\n',
    { name: 'hole', children: [], props: {} },
    { name: 'hole', children: [], props: {} },
    '\n',
    'x',
    'y',
  ];
  expect(mergeText(schema2)).toEqual(['ab', { name: 'area', children: [], props: {} }, 'xy']);
});
