import type { BookRawItem, FBook } from "@bookbox/generator-js";

export const Generator: FBook = (api) => {
  const { header, book, code, math, item, list, area, link } = api;

  return book`
${header.level(2)`Генератор`}
Генератор — это исходный код, который формирует модель книги на каком-либо языке программирования или разметки.
Модель книги также может быть записана как есть в текстовых форматах данных, например json или yaml, если генератор отсутствует.


Генераторы на языках программирования хороши тем, что сам язык программирования выступает как препроцессор.

${header.level(3)`Javascript`}
Для данной книги использован генератор на javascript из библиотеки ${link.href('https://www.npmjs.com/package/@bookbox/generator-js')`@bookbox/generator-js`}.
На самом деле он написан на typescript, поэтому имеет хорошую поддержку типов.
Typescript компилируется в два вида js: CommonJS модули (для совместимости) и Ecmascript модули (предпочтительный вариант).


Книга записывается как чистая функция, которая принимает bookbox апи в качестве аргумента, и возвращает дерево элементов книги.


Пример: так выглядит книга раздела "Генератор" вплоть до текущей строки
${code.lang("typescript")`
import type { FBook } from "@bookbox/generator-js";

export const Generator: FBook = api => {
    const { header, book, code } = api;

    return book\`
\${header.level(2)\`Генератор\`}
Генератор — это исходный код, который формирует модель книги на каком-либо языке программирования или разметки.
Модель книги также может быть записана как есть в текстовых форматах данных, например json или yaml, если генератор отсутствует.


Генераторы на языках программирования хороши тем, что сам язык программирования выступает как препроцессор.


\${header.level(3)\`Javascript\`}
Для данной книги использован генератор на javascript.
На самом деле он написан на typescript, поэтому имеет хорошую поддержку типов.
Typescript компилируется в два вида js: CommonJS модули (для совместимости) и Ecmascript модули (предпочтительный вариант).


Книга записывается как чистая функция, которая принимает bookbox апи в качестве аргумента, и возвращает дерево элементов книги.


Пример: так выглядит книга раздела "Генератор" вплоть до текущей строки
\`
`}

${header.level(4)`Переменные и выражения`}
Так как javascript — полноценный язык программирования, то можно использовать его собственные переменные и выражения.


Примеры:


Математические вычисления
${code.lang("javascript")`
\`\${math\`\\\\pi = \${Math.PI}\`}\`
\`\${math\`2^{17} = \${Math.pow(2, 17)}\`}\`
`}
${math`\\pi = ${Math.PI}`}

${math`2^{17} = ${Math.pow(2, 17)}`}


Операции со списками

Обратите внимание, что список элементов необходимо обернуть в пустой элемент ${code`area`}

${code.lang("javascript")`
area.inline()(
  ...Array(26)
    .fill(0)
    .map((_, i) => String.fromCharCode(i+97))
    .map(char => char.toUpperCase()))
`}
A-Z: ${area.inline()(
    ...Array(26)
      .fill(0)
      .map((_, i) => String.fromCharCode(i + 97))
      .map((char) => char.toUpperCase())
  )}


Использование переменных


${code.lang('javascript')`
() => {
    let leaf: BookRawItem = 'Канторова пыль';
    let empty: BookRawItem = '';
    const level = 2;
    for (let i = 0; i < level; i++) {
        leaf = list(item(leaf), item(empty), item(leaf))
        empty = list(item(empty), item(empty), item(empty));
    }
    return leaf;
}
`}
${(() => {
  let leaf: BookRawItem = 'Канторова пыль';
  let empty: BookRawItem = '';
  const level = 2;
  for (let i = 0; i < level; i++) {
      leaf = list(item(leaf), item(empty), item(leaf))
      empty = list(item(empty), item(empty), item(empty));
  }
  return leaf;
})()}


${header.level(4)`Система модулей`}
Можно использовать любые сборщики javascript, которые поддерживают импорты.
Так как импортируются чистые функции, их можно вкладывать друг в друга и вызывать с api.

Пример:
${code.lang('typescript')`
import type { FBook } from '@bookbox/generator-js';
import {Model} from './model';
import {Generator} from './generator';

export const Internal: FBook = api => {
    const { header, book, image, resource } = api;

    return book\`
\${resource.type('image').path('/pipeline.svg').src(pipeline)}

\${header.level(2)\`Внутреннее устройство книги\`}

Схематически устройство можно представить так

\${image.src('/pipeline.svg').alt('BookBox pipeline')\`Генератор ➞ Модель ➞ Представление\`}

\${Model(api)}


\${Generator(api)}
\`;
};
`}

`;
};
