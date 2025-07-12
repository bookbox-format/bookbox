import { BookSchema } from './model';
import { calculateCounters } from './counters';

const small = (ch: string[]) => ({
  'name': 'format.small',
  'props': {},
  'children': [
    {
      'name': 'format.b',
      'props': {},
      'children': [
        {
          'name': 'area',
          'props': {
            'inline': true,
            'key': '_name',
          },
          'children': [
            {
              'name': 'counter',
              'props': {
                'use': 'test',
              },
              'children': ch,
            },
          ],
        },
        '. ',
      ],
    },
    'Как выглядит симметричное утверждение для дизъюнкции и какая формула его выражает?\n',
  ],
});

const small2 = (ch: string[]) => ({
  'name': 'format.small',
  'props': {},
  'children': [
    {
      'name': 'format.b',
      'props': {},
      'children': [
        {
          'name': 'area',
          'props': {
            'inline': true,
            'key': '_name',
          },
          'children': [
            {
              'name': 'counter',
              'props': {
                'use': 'test',
              },
              'children': ch,
            },
          ],
        },
        '. ',
      ],
    },
    'Перечисленные эквивалентности соответствуют свойствам операций на множествах: например, первая гарантирует, что ',
    {
      'name': 'math',
      'props': {
        'block': false,
      },
      'children': ['P\\cap Q=Q\\cap P'],
    },
    ' для любых множеств ',
    {
      'name': 'math',
      'props': {
        'block': false,
      },
      'children': ['p'],
    },
    ' и ',
    {
      'name': 'math',
      'props': {
        'block': false,
      },
      'children': ['Q'],
    },
    '.\nКакие утверждения соответствуют остальным эквивалентностям?\n',
  ],
});

const schema: BookSchema = [
  { name: 'counter', props: { start: 'test' }, children: [] },
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: [] }] },
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: [] }] },
  small([]),
  small2([]),
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: [] }] },
];

const resultSchema: BookSchema = [
  { name: 'counter', props: { start: 'test' }, children: [] },
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: ['1'] }] },
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: ['2'] }] },
  small(['3']),
  small2(['4']),
  { name: 'area', props: {}, children: [{ name: 'counter', props: { use: 'test' }, children: ['5'] }] },
];

describe('test counters', () => {
  it('bump correct', () => {
    const testSchema = JSON.parse(JSON.stringify(schema));
    calculateCounters(testSchema);
    expect(testSchema).toEqual(resultSchema);
  });
});
