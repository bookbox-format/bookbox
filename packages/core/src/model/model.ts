export type BookScope = 'html' | 'custom';

export type Primitive = string | number | boolean | null;
export type Serialize<Leaf = Primitive> = Leaf | {[key: string]: Serialize<Leaf>} | Serialize<Leaf>[];



export type BookElementProps = Record<string, Primitive | unknown>;

export type BookElementSchema = {
    name: string;
    props: BookElementProps;
    children: BookSchema;
};

export type BookItem = BookElementSchema | string;

// схема дерева
export type BookSchema = BookItem[];

export type BookLayoutView = 'block' | 'inline';

export type BookLinkedItem = {
    bookElementSchema: BookElementSchema;
    firstChild: BookLinkedItem | null;
    lastChild: BookLinkedItem | null;
    previous: BookLinkedItem | null;
    next: BookLinkedItem | null;
    previousLeaf: BookLinkedItem | null;
    nextLeaf: BookLinkedItem | null;
    parent: BookLinkedItem | null;
    raw: string | null;
    view: BookLayoutView;
};

// схема связного дерева
export type BookLinkedSchema = {
    start: BookLinkedItem | null;
    end: BookLinkedItem | null;
    tree: BookLinkedItem[];
};


export type CommonElementProps = { key: string; meta: Record<string, Primitive> };

export type BookElement<
    Name extends string,
    Props extends BookElementProps = {}
> = {
    name: Name;
    props: Props & { key: string; meta: Record<string, Primitive> };
};

export type ElementName<Element extends BookElement<any, any>> =
    Element extends BookElement<infer Name, any> ? Name : never;



/**
 * Создаёт простой теговый шаблон для функции от строкового аргумента
 */
type SimpleStringTemplate<F extends (arg: string) => any> =
    ReturnType<F> extends infer R
        ? (strList: string[], ...values: any[]) => R
        : never;



export type BookHeader<Token> = {
    value: Token[];
    text: string;
    key: string;
    level: number;
};

export const rootBookHeader: BookHeader<any> = {
    value: [],
    text: '',
    key: 'root',
    level: 0,
};

export type BookStore<Token> = {
    /**
     * хранилище элементов по ключам
     */
    elementsByKeys: Record<string, BookElementSchema>;

    /**
     * хранилище токенов по ключам
     */
    dataByKeys: Record<string, Token[]>;
};

export type GetToken<Token> = (params: {
    children: Token[];
    store: BookStore<Token>;
}) => Token;

export type TokenGetter<Props, Token> = (
    props: Partial<Props>
) => GetToken<Token>;

export type BookBuilder<
    Token = unknown,
    ExternalProps = BookElementProps
> = (params: {
    schema: BookSchema;
    store: BookStore<Token>;
    externalBuilder?: Record<
        string,
        Record<string, TokenGetter<ExternalProps, Token>>
    >;
}) => Token[];
