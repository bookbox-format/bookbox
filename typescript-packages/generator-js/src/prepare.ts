import { BookItem, BookSchema } from "@bookbox/core";
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

  for (const item of schema) {
    if (typeof item === "string") {
      result.push(item);
    } else if (typeof item === "number") {
      result.push(`${item}`);
    } else if (item === null) {
      result.push("");
    } else if (typeof item === "boolean") {
      result.push(`${+item}`);
    } else if (isBookResult(item)) {
      // вложенные книги
      result.push(...getPureSchema(item.schema));
    } else if (
      (typeof item === "object" &&
        (item as any).prototype &&
        item instanceof Proxy) ||
      typeof item === "function"
    ) {
      result.push(...getPureSchema([(item as any)()]));
    } else if ("__start" in item) {
      // текущая область
      result.push({
        name: item.__start,
        props: item.props,
        marker: 'start',
        children: [],
      });
    } else if ("__end" in item) {
      result.push({
        name: item.__end,
        props: item.props,
        marker: 'end',
        children: [],
      });
    } else {
      item.children = getPureSchema(item.children) as BookItem[];
      result.push(item as BookItem);
    }
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
