import { BookElementProps, BookElementSchema, BookItem, BookSchema, mergeText, Primitive } from '@bookbox/core';
import { Attribute, Block, Body, TagBlock } from '@bookbox/markup';

export function parseText(value: string): Primitive {
  if (value === 'true') return true;
  if (value === 'false') return false;
  const n = parseFloat(value);
  if (!Number.isNaN(n)) return n;
  return value;
}

export function parseProp(value: string, empty: boolean): Primitive {
  if (empty) return true;
  return parseText(value);
}

function getProps(attrList: Attribute[]): BookElementProps {
  const props: BookElementProps = {};
  for (const attr of attrList) {
    const { name, value, empty } = attr;
    props[name] = parseProp(value, empty);
  }
  return props;
}

export function processBlock<T>(block: Block, fn: (block: Block, children: T[]) => T): T {
  const children = (block.tag?.body?.blocks ?? []).map(block => processBlock(block, fn));
  return fn(block, children);
}

export function getBookItemFromTag(tag: TagBlock, children: BookItem[]): BookElementSchema {
  const { name: rawName, attrList } = tag;
  const name = rawName.replace(/:/g, '.');
  const props = getProps(attrList);
  if (name.startsWith('#')) {
    const elemName = name.slice(name.split('.')[0].length + 1);
    if (name.startsWith('#start')) {
      return {
        name: elemName,
        props,
        children,
        marker: 'start',
      };
    }
    if (name.startsWith('#end')) {
      return {
        name: elemName,
        props,
        children,
        marker: 'end',
      };
    }
    return { name: 'hole', props: {}, children };
  }
  return {
    name: name,
    props,
    children,
  };
}

export function getBookItem(block: Block, children: BookItem[]): BookItem {
  if (block.text) return block.text.replace(/\\./g, s => s[1]);
  if (block.include)
    // интерпретация только здесь
    return {
      name: 'math',
      props: {
        block: block.include.value.startsWith('\n'),
      },
      children: [block.include.value],
    };
  if (block.tag) {
    return getBookItemFromTag(block.tag, children);
  }
  if (block.error) {
    return {
      name: 'error',
      props: {
        name: block.error.message ?? 'parsing error',
        error: block.error.value,
      },
      children: [],
    };
  }
  return '';
}

export function getBookSchema(body: Body): BookSchema {
  return mergeText(body.blocks.map(block => processBlock(block, getBookItem)));
}
