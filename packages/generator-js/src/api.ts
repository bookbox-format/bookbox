import {
  BookElements,
  LevelBookElements,
  BookElement,
  BookElementProps,
  BookElementSchema,
  BookItem,
  BookLayoutView,
  BookSchema,
  BookScope,
  Primitive,
} from "@bookbox/core";

/**
 * Метка старта элемента. Нужна только для проставления символа начала области элемента
 */
export type BookStartMark = { __start: string; props: BookElementProps };

export type BookStart = <T extends BookElementApi<BookElement<string>>>(
  elem: T
) => BookStartMark;

/**
 * Метка конца элемента. Нужна только для проставления символа конца области элемента
 */
export type BookEndMark = { __end: string; props: BookElementProps };

export type BookEnd = <T extends BookElementApi<BookElement<string>>>(elem: T) => BookEndMark;

export type BookRawItem =
  | Primitive
  | BookElementRawSchema
  | BookStartMark
  | BookEndMark
  | BookResult;

export type BookElementRawSchema = Omit<BookElementSchema, "children"> & { children: BookRawItem[] };

// схема дерева до разбора
export type BookRawSchema = (BookRawItem | BookElementApi<BookElement<string>>)[];

export type BookRawFlatSchema = (
  | BookItem
  | BookStartMark
  | BookEndMark
  | BookResult<BookRawFlatSchema>
)[];

export type GetSchema = <Children extends BookRawSchema>(
  ...children: BookRawSchema | [TemplateStringsArray, ...BookRawSchema]
) => Omit<BookElementSchema, "children"> & { children: BookRawItem[] };

export type BookResult<S = BookRawSchema> = { schema: S };
export type BookCreator = (
  text: TemplateStringsArray,
  ...elements: BookRawSchema
) => BookResult;

type AddTemplate<T> = T extends string ? T | TemplateStringsArray | [TemplateStringsArray, ...any[]] : T;

export type BookElementApi<El extends BookElement<string>> = {
  [K in keyof El["props"]]-?: (
    value?: AddTemplate<El["props"][K]>
  ) => BookElementApi<BookElement<El["name"], Omit<El["props"], K>>>;
} & GetSchema;

export type Api<
  ElementsRecord extends Record<keyof ElementsRecord, BookElement<string>>
> = {
  [Name in keyof ElementsRecord]: BookElementApi<ElementsRecord[Name]>;
};

export type LevelApi<
  ElementsRecord extends Record<keyof ElementsRecord, BookElement<string>>
> = {
  [Name in keyof ElementsRecord as Name extends `${string}.${infer X}`
    ? X
    : Name]: BookElementApi<ElementsRecord[Name]>;
};

export type LevelApiName = "format" | "web";
export const LevelApiNameList: LevelApiName[] = ["format", "web"];
export const LevelApiNameSet: Set<string> = new Set(LevelApiNameList);

export type LevelElementsApi = {
  format: LevelApi<LevelBookElements<"format">>;
  web: LevelApi<LevelBookElements<"web">>;
};

/**
 * api for elements
 */
export type ElementsApi = Api<
  Pick<BookElements, Exclude<keyof BookElements, `${string}.${string}`>>
> &
  LevelElementsApi;

/**
 * api helpers
 */
export interface UtilApi {
  start: BookStart;
  end: BookEnd;
  book: BookCreator & { root: BookCreator };
}

export type BookApi = ElementsApi & UtilApi;
