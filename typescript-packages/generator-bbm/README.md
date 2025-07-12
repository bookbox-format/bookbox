# @bookbox/generator-bbm

```
npm i @bookbox/generator-bbm
```

Позволяет записать книгу на языке bbm, использует парсер https://www.npmjs.com/package/@bookbox/markup

## Usage
```
// book.bbm
{title Example}

{#import ./chapter_1.bbm}

{header.level{2} hello}

Hello, world!
```
