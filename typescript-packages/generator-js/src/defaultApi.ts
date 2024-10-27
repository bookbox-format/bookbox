import { BookElementProps, LevelBookElements, isTemplateParams, templateToList, ElementNamespace } from '@bookbox/core';

import { Api, BookApi, BookEnd, BookRawItem, BookStart, GetSchema, UtilApi } from './api';

type TemplatePrepare = (text: TemplateStringsArray, ...elements: any[]) => any;

const getElement: (name: string) => (props: BookElementProps) => GetSchema =
  name =>
  props =>
  (...children) => {
    const list = isTemplateParams(children) ? templateToList(...children) : children;

    return {
      name,
      props,
      children: list as BookRawItem[],
    };
  };

const proxyBuilder = <T extends (...args: any[]) => any>(
  getBuild: (params: Record<string, any>) => T,
  prepare: TemplatePrepare,
) => {
  const getProxy = (params: Record<string, any>) =>
    new Proxy(getBuild(params), {
      get(_, name) {
        return (...children: any[]) => {
          const value: any = isTemplateParams(children) ? prepare(...children) : children[0] ?? true;
          return getProxy({ ...params, [name]: value });
        };
      },
    });

  return getProxy({});
};

function getElementProxy<CApi extends Api<{}>>() {
  return function g<T extends keyof CApi>(name: T, prepare: TemplatePrepare = String.raw) {
    const getElementWithProps = getElement(name as string);

    const builder = proxyBuilder(params => getElementWithProps(params), prepare);

    return builder as unknown as CApi[T];
  };
}

export const bookStart: BookStart = elem => {
  const { name, props } = elem();
  return {
    __start: name,
    props,
  };
};

export const bookEnd: BookEnd = elem => {
  const { name, props } = elem();
  return {
    __end: name,
    props,
  };
};

export const bookCreator: UtilApi['book'] = (text, ...elements) => {
  return { schema: templateToList(text, ...elements) };
};

bookCreator.root = bookCreator;

const getRootProxy = getElementProxy<Omit<BookApi, keyof UtilApi | ElementNamespace>>();
const getFormatProxy = getElementProxy<Api<LevelBookElements<'format'>>>();
const getWebProxy = getElementProxy<Api<LevelBookElements<'web'>>>();

export const defaultBookApi: BookApi = {
  title: getRootProxy('title'),
  authors: getRootProxy('authors'),
  draft: getRootProxy('draft'),
  em: getRootProxy('em'),
  strong: getRootProxy('strong'),

  format: {
    sup: getFormatProxy('format.sup'),
    sub: getFormatProxy('format.sub'),
    pre: getFormatProxy('format.pre'),
    i: getFormatProxy('format.i'),
    b: getFormatProxy('format.b'),
    u: getFormatProxy('format.u'),
    s: getFormatProxy('format.s'),
    small: getFormatProxy('format.small'),
  },
  format_sup: getRootProxy('format_sup'),
  format_sub: getRootProxy('format_sub'),
  format_pre: getRootProxy('format_pre'),
  format_i: getRootProxy('format_i'),
  format_b: getRootProxy('format_b'),
  format_u: getRootProxy('format_u'),
  format_s: getRootProxy('format_s'),
  format_small: getRootProxy('format_small'),

  web: {
    video: getWebProxy('web.video'),
    audio: getWebProxy('web.audio'),
    message: getWebProxy('web.message'),
  },
  web_video: getRootProxy('web_video'),
  web_audio: getRootProxy('web_audio'),
  web_message: getRootProxy('web_message'),

  header: getRootProxy('header'),
  code: getRootProxy('code'),
  label: getRootProxy('label'),
  link: getRootProxy('link'),
  tooltip: getRootProxy('tooltip'),
  image: getRootProxy('image'),
  external: getRootProxy('external'),
  area: getRootProxy('area'),
  list: getRootProxy('list'),
  separator: getRootProxy('separator'),
  item: getRootProxy('item'),
  math: getRootProxy('math'),
  video: getRootProxy('video'),
  audio: getRootProxy('audio'),
  use: getRootProxy('use'),
  counter: getRootProxy('counter'),
  resource: getRootProxy('resource'),
  table: getRootProxy('table'),
  row: getRootProxy('row'),
  cell: getRootProxy('cell'),

  start: bookStart,
  end: bookEnd,
  book: bookCreator,
};
