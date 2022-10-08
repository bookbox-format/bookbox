# @bookbox/generator-js

```
npm i @bookbox/generator-js
```

Позволяет записать книгу как чистую функцию, параметр которой — апи книги, а результат - дерево.

## API
```typescript
const helloBook: FBook = api => api.book`
${api.title`Example`}

Hello, world!
`;
```

С помощью `getBookSchema` можно получить непосредственно дерево элементов

```js
const {schema} = getBookSchema({book: helloBook});

// schema:
[
    '\n',
    {name: 'title', children: ['Example']},
    '\n\nHello, world\n',
]
```