import type { BookApi } from "@bookbox/generator-js";
import {Internal} from './internal';

const logo = './logo.svg';


export default (api: BookApi) => {
    const { book, header, strong, image, authors, title, resource } = api;

    return book.root`
${resource.type('image').path('/logo.svg').src(logo)}
${image.src('/logo.svg').alt('BookBox logo')}
${title`Книжный формат BookBox`}
${authors`Александр Николаичев`}


${header.level(2)`Описание`}

Формат BookBox создан для представления книг и другого текстового контента на экранах переменной ширины.
Данное описание формата реализовано на нём самом.


Основная среда для показа — Веб.
Соответственно основные представления — ${strong`html`} и элементы для веб-фрейворков.
Представление элементов книги без обработки — json представление, отражает структуру книги (AST) и подходит для хранения и передачи по сети.


Среди доступных представлений: Markdown и простой текст.
Вы можете создать своё представление, написав конвертор (об этом ниже).


${Internal(api)}


`;
};
