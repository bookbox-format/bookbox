import { getBookLinkedSchema, getSchemaFromLinkedList } from './linkedSchema';
import { BookMeta, getBookMeta } from './meta';
import {
  BookBuilder,
  BookElementProps,
  BookItem,
  BookSchema,
  BookStore,
  TokenGetter,
  BookElement,
} from './model';
import { getStore } from './store';
import { flatList, getByPath } from '../utils';
import { BookElements, BookElementsWithoutLevel, ElementNamespace, LevelBookElements } from './elements';
import { ExternalBuilder, ExternalProps } from './external';
import { calculateResources, getActualResourceMap, ResourceOptions } from './resources';
import { getIterableBook } from './iterableBook';

export type BookData<T> = {
  tokens: T[];
  meta: BookMeta<T>;
  store: BookStore<T>;
};

/**
 * Добавление ключей по умолчанию всем элементам
 */
function addKeysToSchema(schema: BookSchema, keys: Map<string, number> = new Map()): void {
  const bumpKey = (name: string) => {
    keys.set(name, (keys.get(name) ?? 0) + 1);
  };
  for (const item of schema) {
    if (typeof item === 'string') {
      continue;
    }
    if (item.props.key === undefined) {
      bumpKey(item.name);
      // TODO: разобраться, почему мутация затрагивает все элементы
      item.props = {
        ...item.props,
        key: `${item.name}-${keys.get(item.name)}`,
      };
    }
    addKeysToSchema(item.children, keys);
  }
}

function calculateCounters(
  schema: BookSchema,
  counters: Map<string, number> = new Map(),
  steps: Map<string, number> = new Map(),
): void {
  for (const item of schema) {
    if (typeof item === 'string') {
      continue;
    }
    if (item.name !== 'counter') {
      calculateCounters(item.children, counters, steps);
      continue;
    }
    const props = item.props as BookElements['counter']['props'];
    if (props.start) {
      counters.set(props.start, props.initial ?? 0);
      if (props.step) {
        steps.set(props.start, props.step);
      }
      continue;
    }
    if (props.end) {
      counters.delete(props.end);
      steps.delete(props.end);
      continue;
    }
    if (props.use) {
      const value = counters.get(props.use) ?? 0;
      item.children = [`${value}`];
      const step = steps.get(props.use) ?? 1;
      counters.set(props.use, value + step);
    }
  }
}

const prepareBookElem: {
  [K in keyof BookElements]?: (item: { props: BookElements[K]['props']; children: BookSchema }) => void;
} = {
  code: item => {
    if (
      (item.props.block || item.props.position !== 'inline') &&
      item.children.length === 1 &&
      typeof item.children[0] === 'string'
    ) {
      item.children[0] = item.children[0].trim();
    }
  },
};

function prepareSchema(schema: BookSchema) {
  for (const item of getIterableBook(schema)) {
    if (typeof item === 'string') continue;

    const { name } = item;
    if (name in prepareBookElem) {
      prepareBookElem[name as keyof BookElements]!(item as any);
    }
  }
}

export type CreateBookParams<Token> = {
  schema: BookSchema;
  builder: BookBuilderParams<Token>;
  externalBuilder?: ExternalBuilder<Token>;
  resourceOptions?: ResourceOptions;
};

export function createBook<Token>({
  schema: originalSchema,
  builder: builderParams,
  externalBuilder,
  resourceOptions,
}: CreateBookParams<Token>): BookData<Token> {
  let schema: BookSchema = JSON.parse(JSON.stringify(originalSchema));
  const builder = createBookBuilder(builderParams);
  addKeysToSchema(schema);
  calculateCounters(schema);
  calculateResources(schema, getActualResourceMap({ schema, resourceOptions }));
  prepareSchema(schema);
  const linkedSchema = getBookLinkedSchema(schema, true);
  const tokensSchema = getSchemaFromLinkedList(linkedSchema.tree);
  const store = getStore({ builder, schema, externalBuilder });
  const meta = getBookMeta({ schema, store, builder });
  schema = tokensSchema;

  return {
    tokens: builder({ schema, store, externalBuilder }),
    meta,
    store,
  };
}

type SynteticElements = {
  text: BookElement<'text', { raw: string }>;
  page: BookElement<'page', { count: number }>;
  error: BookElement<'error', { props: Record<string, any>; name: string; error: string }>;
  empty: BookElement<'empty'>;
};
const synteticElementNameSet = new Set(['text', 'page', 'error', 'empty']);
const emptyElementNameSet = new Set(['resource']);
const prepareElementNameSet = new Set(['code']);

type TokenGetterList<T extends Record<keyof T, BookElement<string>>, Token> = {
  [Name in keyof T]: TokenGetter<T[Name]['props'], Token>;
};

export type BookBuilderParams<Token> = {
  elements: TokenGetterList<Omit<BookElements, `${ElementNamespace}.${string}`>, Token> & {
    format: TokenGetterList<BookElementsWithoutLevel<LevelBookElements<'format'>, 'format'>, Token>;
    web: TokenGetterList<BookElementsWithoutLevel<LevelBookElements<'web'>, 'web'>, Token>;
  };
  synteticElements: TokenGetterList<SynteticElements, Token>;
};

type BookBuilderElements<Token> = Token extends string
  ? Record<string, BookBuilderElements<Token> | TokenGetter<BookElementProps, Token>>
  : never;

export function createBookBuilder<Token>({
  elements,
  synteticElements,
}: BookBuilderParams<Token>): BookBuilder<Token, ExternalProps> {
  const builder: BookBuilder<Token, ExternalProps> = ({ schema, store, externalBuilder }) => {
    const getItemBuilder: (store: BookStore<Token>) => (item: BookItem) => Token = store => item => {
      // leaf case
      if (typeof item === 'string') {
        return synteticElements.text({ raw: item, key: '' })({
          children: [],
          store,
        });
      }

      // choose name
      let { name } = item;
      if (emptyElementNameSet.has(name)) {
        name = 'empty';
      }

      // choose namespace
      let targetElements = elements as unknown as BookBuilderElements<Token>;
      if (synteticElementNameSet.has(name)) {
        targetElements = synteticElements as unknown as BookBuilderElements<Token>;
      }

      // choose element builder
      type BuilderType = TokenGetter<BookElementProps, Token>;
      let elemBuilder: BuilderType | undefined;
      if (name === 'external') {
        if (externalBuilder) {
          const { scope = 'custom', name: extName = 'local' } = item.props;
          elemBuilder = getByPath([`${scope}`, `${extName}`], externalBuilder);
        }

        // default external builder
        if (typeof elemBuilder !== 'function') {
          elemBuilder = getByPath([name], elements);
        }
      } else {
        const path = name.split('.');
        elemBuilder = getByPath(path, targetElements);
      }

      // error
      const getError = (children: Token[], error?: string) => {
        elemBuilder = synteticElements.error as TokenGetter<BookElementProps, Token>;
        return synteticElements.error({
          props: item.props,
          name: item.name,
          error: error ?? 'error',
        })({
          children,
          store,
        });
      };

      // render children
      let childTokens: Token[] = [];
      try {
        childTokens = builder({
          schema: item.children,
          store,
          externalBuilder,
        });
      } catch (e) {
        console.error(e);
        return getError([], String(e));
      }

      if (typeof elemBuilder !== 'function') {
        return getError(childTokens, 'unknown element');
      }

      // ok
      try {
        return elemBuilder(item.props)({
          children: childTokens,
          store,
        });
      } catch (e) {
        console.error(e);
        return getError([], String(e));
      }
    };
    const itemBuilder = getItemBuilder(store);
    return flatList(schema.map(itemBuilder));
  };

  return builder;
}

type BookExternalBuilderParams<Token> = {
  element: ExternalBuilder<Token>;
};

export function createBookExternalBuilder<Token>({ element }: BookExternalBuilderParams<Token>): {
  externalBuilder: ExternalBuilder<Token>;
} {
  return { externalBuilder: element };
}
