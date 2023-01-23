import { StringUnionHint } from '../utils';
import { BookElement, BookScope, Primitive, BookElementProps } from './model';

export type BookElements = MetaElements &
  BlockElements &
  MediaElements &
  LayoutElements &
  StoreElements &
  TextFormatElements &
  WebElements;

export type ElementNamespace = 'format' | 'web';

export type LevelBookElements<T extends ElementNamespace> = Pick<
  BookElements,
  Extract<keyof BookElements, `${T}.${string}`>
>;

export type BookElementsWithoutLevel<
  ElementsRecord extends Record<keyof ElementsRecord, BookElement<string>>,
  LevelName extends string,
> = {
  [Name in keyof ElementsRecord as Name extends `${LevelName}.${infer X}` ? X : Name]: ElementsRecord[Name];
};

type GetElements<T extends Record<string, BookElementProps>> = {
  [K in keyof T]: K extends string ? BookElement<K, T[K]> : never;
};

export type MetaElements = GetElements<{
  title: {};
  authors: {};
}>;

export type LayoutPosition = 'inline' | 'end' | 'start' | 'center' | 'full';

export type LayoutProps = {
  block?: boolean;
  inline?: boolean;
  position?: LayoutPosition;
};

export type InteractionProps = {
  fast: boolean;
};

export type MediaProps = {
  src: string;
  alt?: string;
};

export type BookElementSize = string | number;

export type SizeProps = {
  width?: BookElementSize;
  height?: BookElementSize;
};

/**
 * Блоки-атомы, из которых состоит книга, не считая обычного текста.
 */
export type BlockElements = GetElements<{
  header: { level?: 1 | 2 | 3 | 4 | 5 | 6 };
  strong: {};
  em: {};
  code: { lang?: string } & LayoutProps;

  tooltip: { content: string };
  label: { ref: string };

  /**
   * local link or hyperlink
   */
  link: { ref?: string; href?: string };

  /**
   * Math formula, like LaTEX by default
   */
  math: LayoutProps;

  draft: {};

  /**
   * Placeholder for external elements
   */
  external: {
    scope?: BookScope | (string & {});
    name?: string;
    params?: Record<string, Primitive>;
  };
}>;

export const defaultBlockNameList: (keyof BlockElements)[] = [
  'strong',
  'em',
  'header',
  'code',
  'label',
  'link',
  'tooltip',
  'math',
  'external',
];
export const defaultBlockNames: Set<keyof BlockElements> = new Set(defaultBlockNameList);

export type MediaElements = GetElements<{
  image: MediaProps & SizeProps & LayoutProps;
  video: MediaProps & SizeProps & LayoutProps;
  audio: MediaProps & LayoutProps;
}>;

export type TextFormatElements = GetElements<{
  'format.b': LayoutProps;
  'format.i': LayoutProps;
  'format.sup': LayoutProps;
  'format.sub': LayoutProps;
  'format.pre': LayoutProps;
  'format.small': LayoutProps;
}>;

export type WebElements = GetElements<{
  'web.video': { type?: StringUnionHint<'youtube' | 'vimeo'> } & MediaProps & SizeProps & LayoutProps;
  'web.audio': { type?: StringUnionHint<'soundcloud'> } & MediaProps & SizeProps & LayoutProps;
  'web.message': { type?: StringUnionHint<'telegram' | 'twitter'> } & MediaProps & SizeProps & LayoutProps;
}>;

/**
 * Элементы, которые определяют верстку остальных элементов
 */
export type LayoutElements = GetElements<{
  area: LayoutProps;
  list: { order?: boolean };
  item: {};
  separator: {};
}>;

export type StoreElements = GetElements<{
  /**
   * Использует заданную мета-информацию для вывода её части
   *
   * ref — ключ, по которому ищется элемент
   */
  use: { ref: string; path?: string };

  /**
   * числовой счётчик
   */
  counter: {
    start?: string;
    end?: string;
    use?: string;

    /**
     * initial counter value, by default `0`
     */
    initial?: number;

    /**
     * counter step, by default `1`
     */
    step?: number;
  };

  resource: { path: string; src: string; type?: keyof MediaElements };
}>;
