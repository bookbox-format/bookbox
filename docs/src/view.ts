import type { FBook } from '@bookbox/generator-js';

export const View: FBook = api => {
    const { header, book, link, code } = api;

    return book`
${header.level(2)`Представление`}
Представление — отображение модели книги на некий формат, удобный для восприятия.
Чтобы подключить новые представления, необходимо написать сборщик представления, который будет передан в функцию создания книги как аргумент.
Каждое представление превращает дерево модели в массив токенов.
Тип токена может быть любым, для текстовых форматов, таких как html или markdown — это строки.
Для представлений внутри языков программирования или фреймворков токены могут быть не обязательно строками.
Например, для React они могут иметь тип ReactNode.


Пример:
${code.lang('typescript')`
type HtmlToken = string;

const htmlBuilder: BookBuilderParams<HtmlToken> = {
    elements: htmlElements, // перечисляем все элементы
    synteticElements: htmlSynteticElements, // все синтетические элементы
};

export const createHtmlBook = getPartialApply< // параметризуем createBook сборщиком
    CreateBookParams<HtmlToken>,
    "builder",
    BookData<HtmlToken>
>(createBook, { builder: htmlBuilder });
`}


${header.level(3)`HTML`}
Данная книга трансформируется в HTML с помощью библиотеки ${link.href('https://www.npmjs.com/package/@bookbox/view-html')`@bookbox/view-html`}.
Можно встроить html на сайт, либо сгенерировать отдельный html документ.


Пример:

Книга собирается в html примерно так:
${code.lang('javascript')`
import { createHtmlBook, getBookBoxHtmlDocument } from "@bookbox/view-html";
import { readFileSync, writeFileSync } from "fs";

const schema = JSON.parse(readFileSync("./dist/docs.json").toString());

const bookData = createHtmlBook({
  schema,
  externalBuilder: { // добавляем внешний сборщик
    mermaid: {
      local:
        ({ key }) =>
        ({ store }) => {
          const rawChildren = store.elementsByKeys[key];
          return \`<div class="mermaid">\${rawChildren.children.join("")}</div>\`;
        },
    },
  },
});

// генерация документа
writeFileSync(
  "./dist/docs.html",
  getBookBoxHtmlDocument({
    bookData,
    inlineHead: \`
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>
\`,
  })
);
`}

Выше можно увидеть возможности расширения стандартных элементов, а именно — поддержку диаграмм mermaid.

${header.level(4)`Элементы`}
Каждый элемент в верстке получает свои data- аттрибуты и css класс.
${code.lang('typescript')`
const htmlElements: BookBuilderParams<HtmlToken>["elements"] = {
    title:
      ({ key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        return \`<h1 class="book-box-title" data-key="\${key}" data-name="title" data-layout="top">\${childrenHtml}</h1>\`;
      },
    authors:
      ({ key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        return \`<div class="book-box-authors" data-key="\${key}" data-name="authors" data-layout="top">\${childrenHtml}</div>\`;
      },
    draft:
      ({ key }) =>
      ({ children }) => {
        const childrenHtml = listToHtml(children);
        return \`<div class="book-box-draft" data-key="\${key}" data-name="draft" data-layout="top">\${childrenHtml}</div>\`;
      },
    // ...
}
`}
У каждого элемента есть уникальный в пределах текущей книги ключ data-key.


${header.level(4)`Стили`}
Стили css подключаются отдельно, если книга встраивается в существующую страницу, либо включены по умолчанию, если генерируется отдельный документ.

Стили для подсветки синтаксиса кода лежат в отдельном файле, поэтому при внедрении их нужно подключить вместе с основными
${code.lang('javascript')`
import '@bookbox/view-html/styles/htmlBook.css';

// если нужна подсветка синтаксиса
import '@bookbox/view-html/styles/code.css';
`}

По умолчанию есть светлая и тёмная темы.
Практически все настройки цветов хранятся в css переменных, поэтому их можно тонко настраивать.


${header.level(4)`Элементы управления`}
Помимо собственно текста книги, в html представлении есть: навигация по заголовкам, навигация по медиа-элементам, настройки отображения и расхлоп на всё пространство браузера.


${header.level(4)`Навигация`}
Вся книга пронизана сквозной нумерацией блоков по 500 символов.
Такие блоки далее будут называться страницами по аналогии с обычными книгами.


В начале каждого такого блока помещается синтетический элемент метка с номером страницы.
Эти элементы имеют id вида page-1, page-2 и т.д.
При скролле страницы текущий url меняет свою hash часть на тот id, который ближе всех находится к верхнему краю окна.
Таким образом при перезагрузке книга прокручивается до того места, в котором была открыта последний раз.
Также можно делится ссылкой на конкретную страницу.


При навигации по заголовкам или медиа ресурсам при клике происходит прокрутка к целевому элементу.
Аналогично работают и остальные переходы, например переход к содержимому элемента label или нажатие на значок параграфа рядом с заголовками.
При этих переходах целевой элемент на короткое время подсвечивается.


${header.level(4)`Минимум javascript`}
По возможности все динамические элементы (tooltip, label) управляются через css.
Элементы управления книгой также работают на css.

Javascript используется для следящей навигации и переходов к элементам.
Поэтому при его отключении отключится навигация, но контент продолжит отображаться.
`;
};
