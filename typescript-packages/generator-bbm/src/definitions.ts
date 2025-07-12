import { BookElementSchema, BookItem, BookSchema, expandMarkers, mergeText, print } from '@bookbox/core';
import { Block, Body } from '@bookbox/markup';
import { getBookItem, getBookItemFromTag, parseProp, parseText, processBlock } from './model';

export type DefinitionConfig = {
  getElement(elem: BookElementSchema): Partial<BookElementSchema>;
  addToStart?: (elem: BookElementSchema) => BookSchema;
};

export type Definitions = Record<string, DefinitionConfig>;

function mergeElementSchemas(schemas: Partial<BookElementSchema>[]): BookElementSchema {
  const props = Object.assign({}, ...schemas.map(v => v.props ?? {}));
  const children = schemas.map(v => v.children ?? []).flat();
  const name = schemas.filter(v => v.name).at(-1)?.name ?? '';
  const marker = schemas.filter(v => v.marker).at(-1)?.marker;
  const result: BookElementSchema = {
    children,
    props,
    name,
  };
  if (marker) result.marker = marker;
  return result;
}

function mergeDefinitionConfigs(configs: DefinitionConfig[]): DefinitionConfig {
  return {
    getElement: elem => {
      const schemas = configs.map(config => config.getElement(elem));
      return mergeElementSchemas(schemas);
    },
    addToStart: elem => configs.map(config => config.addToStart?.(elem) ?? []).flat(),
  };
}

function parseDefinitionChild(block: Block, children: DefinitionConfig[]): DefinitionConfig {
  const mergedConfig = mergeDefinitionConfigs(children);
  const getMergeElem = (elem: BookElementSchema): BookElementSchema =>
    mergeElementSchemas([{ props: elem.props, marker: elem.marker }, mergedConfig.getElement(elem)]);

  const printChildren = (elem: BookElementSchema): string => print(mergedConfig.getElement(elem).children ?? []);
  if (block.tag) {
    const name = block.tag.name;

    // setters
    if (name.startsWith('#set:')) {
      const setterName = name.slice(5); // '#set:'.length
      if (setterName === 'name') {
        return {
          getElement: elem => ({
            name: printChildren(elem),
            children: [{ name: 'hole', props: {}, children: [] }],
          }),
        };
      }
      if (setterName === 'start') {
        return {
          addToStart: elem => {
            const children = mergedConfig.getElement(elem).children ?? [];
            return children.concat(mergedConfig.addToStart?.(elem) ?? []);
          },
          getElement: () => ({
            children: [{ name: 'hole', props: {}, children: [] }],
          }),
        };
      }
      if (setterName.startsWith('props:')) {
        const propName = setterName.slice(6); // 'props:'.length
        return {
          getElement: elem => ({
            props: {
              [propName]: parseProp(printChildren(elem), block.tag?.separator === ''),
            },
            children: [{ name: 'hole', props: {}, children: [] }],
          }),
        };
      }
      return {
        getElement: () => ({
          children: [{ name: 'hole', props: {}, children: [] }],
        }),
      };
    }

    // getters
    if (name.startsWith('#get')) {
      const getterName = name.slice(5); // '#get:'.length
      if (getterName === 'children') {
        const isString = Boolean(block.tag.attrList.find(attr => attr.name === 'string'));
        return {
          getElement: elem => ({
            children: isString ? [print(elem.children)] : elem.children,
          }),
        };
      }
      if (getterName.startsWith('props:')) {
        const propName = getterName.slice(6); // 'props:'.length
        return {
          getElement: elem => ({
            children: [String(elem.props[propName] ?? '')],
          }),
        };
      }
      return {
        getElement: () => ({
          children: [{ name: 'hole', props: {}, children: [] }],
        }),
      };
    }

    // conditions
    if (name.startsWith('#not')) {
      return {
        getElement: elem => {
          const value = printChildren(elem);
          const result = !Boolean(parseText(value));
          return {
            children: [result ? 'true' : 'false'],
          };
        },
      };
    }

    // definition
    if (name.startsWith('#def')) {
      return {
        getElement: getMergeElem,
        addToStart: mergedConfig.addToStart,
      };
    }

    // other tags
    return {
      getElement: elem => {
        const newElem = mergedConfig.getElement(elem);
        const children = newElem.children ?? [];
        const schema = getBookItemFromTag(block.tag!, children);
        Object.assign(schema.props, newElem.props);
        return {
          children: [schema],
        };
      },
      addToStart: mergedConfig.addToStart,
    };
  }

  // other blocks
  return {
    getElement: () => ({
      children: [getBookItem(block, [])],
    }),
  };
}

type ParseDefinitionAstResult = {
  name: string;
  config: DefinitionConfig;
};

function parseDefinitionAst(block: Block): ParseDefinitionAstResult | null {
  const { name, attrList = [] } = block.tag ?? {};
  if (name !== '#def') return null;
  const attrs = new Map(attrList.map(attr => [attr.name, attr]));
  const defAttr = attrs.get('name');
  const defName = defAttr?.value;
  if (!defAttr || !defName) return null;
  const config = processBlock(block, parseDefinitionChild);
  return { name: defName, config };
}

export function parseDefinitions(body: Body): Definitions {
  return Object.fromEntries(
    body.blocks
      .map(block => parseDefinitionAst(block))
      .filter(r => r !== null)
      .map(r => [r.name, r.config]),
  );
}

function expandElemDefinitions(
  elem: BookItem,
  defs: Definitions,
  startSchema: BookSchema,
  firstDef: Set<string> = new Set(),
): BookSchema {
  if (typeof elem === 'string') return [elem];
  const isDefinition = elem.name.startsWith('def.');
  const localName = isDefinition ? elem.name.slice(4) : elem.name;
  if (!isDefinition || !defs.hasOwnProperty(localName)) {
    if (isDefinition) return [{ name: 'hole', props: {}, children: [] }];
    return [
      {
        ...elem,
        children: expandSchemaDefinitions(elem.children ?? [], defs, startSchema, firstDef),
      },
    ];
  }
  if (!(localName in defs)) return [{ name: 'hole', props: {}, children: [] }];
  const config = defs[localName];
  if (!firstDef.has(localName)) {
    const add = config.addToStart;
    if (add) startSchema.push(...add(elem));
    firstDef.add(localName);
  }

  const newElem = config.getElement(elem);

  const children = expandSchemaDefinitions(newElem.children ?? elem.children ?? [], defs, startSchema, firstDef);

  if (newElem.name === '') return children;

  return [
    {
      name: newElem.name ?? 'area',
      props: newElem.props ?? elem.props,
      children,
      marker: newElem.marker ?? elem.marker,
    },
  ];
}

function expandSchemaDefinitions(
  bookSchema: BookSchema,
  defs: Definitions,
  startSchema: BookSchema,
  firstDef: Set<string> = new Set(),
): BookSchema {
  return bookSchema.flatMap(elem => expandElemDefinitions(elem, defs, startSchema, firstDef));
}

export function expandDefinitions(schema: BookSchema, definitions: Definitions): BookSchema {
  const start: BookSchema = [];
  schema = expandMarkers(schema);
  schema = expandSchemaDefinitions(schema, definitions, start);
  return mergeText(start.concat(schema));
}
