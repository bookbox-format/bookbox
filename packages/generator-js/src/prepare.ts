import { BookElementSchema, BookItem, BookSchema } from "@bookbox/core";
import { BookApi, BookRawSchema, BookResult } from "./api";
import { defaultBookApi } from "./defaultApi";

type Item<T extends any> = T extends (infer X)[] ? X : never;

function isBookResult(x: Item<BookRawSchema>): x is BookResult {
  return typeof x === "object" && x !== null && "schema" in x;
}

/**
 * Составление дерева с учётом границ
 */
export function getPureSchema(schema: BookRawSchema): BookSchema {
  const result: BookSchema = [];
  const stack: BookElementSchema[] = [];
  const getTarget = () =>
    stack.length > 0 ? stack[stack.length - 1].children : result;

  for (const item of schema) {
    // куда класть текущие элементы
    const target = getTarget();

    if (typeof item === "string") {
      target.push(item);
    } else if (typeof item === "number") {
      target.push(`${item}`);
    } else if (item === null) {
      target.push("");
    } else if (typeof item === "boolean") {
      target.push(`${+item}`);
    } else if (isBookResult(item)) {
      // вложенные книги
      target.push(...getPureSchema(item.schema));
    } else if (
      (typeof item === "object" &&
        (item as any).prototype &&
        item instanceof Proxy) ||
      typeof item === "function"
    ) {
      target.push(...getPureSchema([(item as any)()]));
    } else if ("__start" in item) {
      // текущая область
      stack.push({
        name: item.__start,
        props: item.props,
        children: [],
      });
    } else if ("__end" in item) {
      const elem = stack.pop();

      if (elem) {
        const parentTarget = getTarget();

        parentTarget.push(elem);
      }
    } else {
      item.children = getPureSchema(item.children) as BookItem[];
      target.push(item as BookItem);
    }
  }

  // замыкаем остатки стека
  while (stack.length > 0) {
    const elem = stack.pop()!;
    const target = getTarget();
    target.push(elem);
  }

  return result;
}

export type FBook = (api: BookApi) => { schema: BookRawSchema };

export type GetBookSchemaParams = {
  api?: BookApi;
} & (
  | {
      book: FBook;
    }
  | {
      rawSchema: BookRawSchema;
    }
);

export function getBookSchema({
  api = defaultBookApi,
  ...params
}: GetBookSchemaParams): { schema: BookSchema } {
  let rawSchema: BookRawSchema;
  if ("rawSchema" in params) {
    rawSchema = params.rawSchema;
  } else {
    rawSchema = params.book(api).schema;
  }

  return { schema: getPureSchema(rawSchema) };
}
