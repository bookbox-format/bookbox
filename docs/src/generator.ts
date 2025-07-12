import { js } from "@bookbox/preset-web";

export const Generator: js.FBook = (api) => {
  const { header, book, code, math, external, area, link, format } = api;

  return book`
${header.level(2)`Генератор`}
Генератор — это исходный код, который формирует модель книги на каком-либо языке программирования или разметки.
Модель книги также может быть записана как есть в текстовых форматах данных, например json или yaml, если генератор отсутствует.


Сначала будет описан нативный язык разметки Bookbox markup (bbm), но можно сделать генератор на любом языке программирования.
Генераторы на языках программирования хороши тем, что сам язык программирования выступает как препроцессор.
На текущий момент реализована поддержка языка javascript.

${header.level(3).key('inline-bbm')`Bookbox markup`}

${header.level(3)`Javascript`}
Для данной книги использован генератор на javascript из библиотеки ${link.href('https://www.npmjs.com/package/@bookbox/generator-js')`@bookbox/generator-js`}  (за исключением ${link.ref`inline-bbm``раздела`} про нативный язык разметки bbm).
На самом деле генератор написан на typescript, поэтому имеет хорошую поддержку типов.
Typescript компилируется в два вида js: CommonJS модули (для совместимости) и Ecmascript модули (предпочтительный вариант).


Книга записывается как чистая функция, которая принимает bookbox апи в качестве аргумента, и возвращает дерево элементов книги.


Пример: так выглядит книга начала раздела "Генератор"
${code.lang("typescript")`
import type { FBook } from "@bookbox/generator-js";

export const Generator: FBook = api => {
    const { header, book, code } = api;

    return book\`
\${header.level(2)\`Генератор\`}
Генератор — это исходный код, который формирует модель книги на каком-либо языке программирования или разметки.
Модель книги также может быть записана как есть в текстовых форматах данных, например json или yaml, если генератор отсутствует.


Сначала будет описан нативный язык разметки Bookbox markup (bbm), но можно сделать генератор на любом языке программирования.
Генераторы на языках программирования хороши тем, что сам язык программирования выступает как препроцессор.
На текущий момент реализована поддержка языка javascript.
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

Обратите внимание, что список элементов необходимо обернуть в пустой элемент ${code.inline()`area`}

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
    // Канторова пыль
    let leaf = '|';
    let empty = '.';
    for (let i = 0; i < 5; i++) {
        leaf = leaf + empty + leaf
        empty = empty + empty;
    }
    return leaf;
}
`}
${(() => {
    // Канторова пыль
    let leaf = '|';
    let empty = '.';
    for (let i = 0; i < 5; i++) {
        leaf = leaf + empty + leaf
        empty = empty + empty;
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


${header.level(4)`Маркеры начала и конца`}
Маркеры start и end нативно поддерживаются в виде функций

Пример из математической книги


${code.lang('typescript')`
import type { FBook } from '@bookbox/generator-js';

export const Math: FBook = api => {
    const { start, end, list, item, math } = api;

    return book\`
\${start(list)}
\${item\`
(рефлексивность) \${math\`x R x\`} для всех \${math\`x \\in X\`};
\`}
\${item\`
(симметричность) \${math\`x R y \\rArr y R x\`} для всех \${math\`x, y \\in X\`};
\`}
\${item\`
(транзитивность) \${math\`x R y\`} и \${math\`y R z \\rArr x R z\`} для всех \${math\`x, y, z \\in X\`}.
\`}
\${end(list)}
`}

`;
};
