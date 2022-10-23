# @bookbox/core

```
npm i @bookbox/core
```

## API

```typescript
import {createBook} from '@bookbox/core';

const {
    tokens, // array of tokens for view
    meta, // meta info: contents, media
    store, // store of elements and tokens
} = createBook({
    builder, // builder for view (html, markdown, ...)
    externalBuilder, // optional, for extensions
    schema, // ast tree from generator or raw tree from json/yaml
    resourceMap, // optional, for custom resource paths
});
```

Elements
```typescript
import type {BookElements} from '@bookbox/core';

type AllElementNames = keyof BookElements;
// -> "title" | "authors" | "header" | "strong" | "em" | "code" | ...

type CodePropNames = keyof BookElements['code']['props'];
// -> "lang" | "block" | "inline" | "position" | "key" | "meta"
```