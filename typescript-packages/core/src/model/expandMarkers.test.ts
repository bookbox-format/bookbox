import { BookSchema } from './model';
import { expandMarkers } from './expandMarkers';

const schema: BookSchema = [
  { name: 'list', props: {}, children: [], marker: 'start' },
  { name: 'item', props: {}, children: ['text'] },
  { name: 'item', props: {}, children: ['prefix'], marker: 'start' },
  'text2',
  { name: 'item', props: {}, children: [], marker: 'end' },
  { name: 'item', props: {}, children: ['text3'] },
  { name: 'list', props: {}, children: [], marker: 'end' },
  { name: 'list', props: {}, children: [], marker: 'start' },
  { name: 'item', props: {}, children: [], marker: 'start' },
  'text4',
];

test('start + end', () => {
  const schemaWithoutMarkers = expandMarkers(schema);

  expect(schemaWithoutMarkers).toEqual([
    {
      name: 'list',
      props: {},
      children: [
        { name: 'item', props: {}, children: ['text'] },
        { name: 'item', props: {}, children: ['prefix', 'text2'] },
        { name: 'item', props: {}, children: ['text3'] },
      ],
    },
    {
      name: 'list',
      props: {},
      children: [{ name: 'item', props: {}, children: ['text4'] }],
    },
  ]);
});
