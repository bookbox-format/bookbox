import { BookSchema, print } from '@bookbox/core';
import { expandDefinitions, parseDefinitions } from './definitions';
import { parse } from '@bookbox/markup';
import { getBookSchema } from './model';

test('expand defs', () => {
  const schema: BookSchema = [
    {
      name: 'def.example',
      children: ['test'],
      props: {},
    },
  ];
  const newSchema = expandDefinitions(schema, {
    'example': {
      getElement: elem => ({
        name: 'title',
        children: [print(elem.children) + '!'],
      }),
    },
  });

  expect(newSchema).toEqual([
    {
      name: 'title',
      props: {},
      children: ['test!'],
    },
  ]);
});

const definitionText = `
{#def.name{theorem}
{#set:name area}
{#set:start
{counter.start{theorem}.initial{1}}
}
{format:b.inline
{#set:props:key {#get:props:key}_name}
Теорема
{counter.use{theorem}
{#set:props:key {#get:props:key}_link}
}
{area.inline
{#set:props:hidden {#not {#get:props:name}}}
({#get:props:name})}.
}
{#get:children}
}

{def:theorem.name{example}.key{test}
theorem text
}

{def:theorem.key{test}
without name
}

{#def.name{link}
{#set:name label}
{#set:props:ref {#get:children.string}}
{use {#set:props:ref {#get:children.string}_link}}
}

{def:link test}
`;

test('parse def', () => {
    const body = parse(definitionText);
    const definitions = parseDefinitions(body);
    expect(definitions).toMatchSnapshot('definitions');

    const schema = getBookSchema(body);

    // without definitions
    expect(schema).toMatchSnapshot('schema');
    expect(print(schema)).toMatchSnapshot('schema text');

    const newSchema = expandDefinitions(schema, definitions);

    // with definitions
    expect(newSchema).toMatchSnapshot('newSchema');
    expect(print(newSchema)).toMatchSnapshot('newSchema text');
})