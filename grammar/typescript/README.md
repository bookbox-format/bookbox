# @bookbox/markup

```
npm i @bookbox/markup
```

## API

```typescript
import { parse, stringify } from '@bookbox/markup';

const text = `
just string

{a.href(ya.ru) ya}
`;

const ast = parse(text); // type Body
/*
{
  "blocks": [
    {
      "text": "\njust string\n\n"
    },
    {
      "tag": {
        "name": "a",
        "body": {
          "blocks": [
            {
              "text": "ya"
            }
          ]
        },
        "attrList": [
          {
            "name": "href",
            "value": "ya.ru"
          }
        ]
      }
    },
    {
      "text": "\n"
    }
  ]
}
*/

const text_copy = stringify(ast);
/*

just string

{a.href{ya.ru} ya}

/*
```
