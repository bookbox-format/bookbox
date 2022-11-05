import type { FBook } from "@bookbox/preset-web";

export const Properties: FBook = api => {
    const {
        book,
        header,
        em,
        start,
        end,
        list,
        item,
        label,
        area,
    } = api;

    return book`
${start(area.key`type-Primitive`)}
${header.level(4)`Primitive`}
Primitive — примитивное сериализуемое значение. Это либо строка (string), либо число (number), либо логический тип истина/ложь (boolean).

${end(area)}


${start(area.key`type-Record`)}
${header.level(4)`Record<T>`}
Объект со строковыми ключами и значениями T.
На месте T может быть любая сериализуемая структура.

Например, Record<string> — объект, где все значения строки.

${end(area)}


${start(area.key`type-LayoutPosition`)}
${header.level(4)`LayoutPosition`}
LayoutPosition — положение блока относительно потока документа, строковое значения.


Возможные значения:
${list`
${item`${em`full`} — блок растягивается на всю ширину`}
${item`${em`center`} — блок выровнен по центру`}
${item`${em`start`} — блок прижимается к стороне, от которой направлен текст (левая для большинства языков)`}
${item`${em`end`} — блок прижимается к стороне, на которую направлен текст (правая для большинства языков)`}
${item`${em`inline`} — блок ведёт себя как текст, встраивается в строку`}
`}
${end(area)}


${start(area.key`type-BookElementSize`)}
${header.level(4)`BookElementSize`}
BookElementSize — относительный размер, всегда считается относительно некого значения.


Может задаваться числом от 0 до 1, что будет означать долю.
Все числа вне этого диапазона будет приведены к ближайшему числу из диапазона (0 или 1).

Также может задаваться строкой вида n%, где n — число от 0 до 100, остальные числа будут приведены к ближайшему число (0 или 100).

Все остальные значения будут интерпретироваться как 1.
${end(area)}


${start(area.key`type-LayoutProps`)}
${header.level(4)`LayoutProps`}
LayoutProps — свойства расположения блока на странице.


Поля:
${list`
${item`${em`inline`}: boolean — в потоке текста`}
${item`${em`block`}: boolean — не в потоке текста`}
${item`${em`position`}: ${label.ref('type-LayoutPosition')`LayoutPosition`} — более точное значение`}
`}

Приоритет определения принадлежности потоку текста: inline ➞ block ➞ position.
${end(area)}


${start(area.key`type-MediaProps`)}
${header.level(4)`MediaProps`}
MediaProps — свойства для любого контента, который определяется по ссылке на источник данных.


Поля:
${list`
${item`${em`src`}: string — ссылка на источник, может быть внутренняя (указание на ресурс) либо внешняя`}
${item`${em`alt`}: string — альтернативный текст при недоступности изображения`}
`}
${end(area)}


${start(area.key`type-SizeProps`)}
${header.level(4)`SizeProps`}
SizeProps — свойства для определения размеров.


Поля:
${list`
${item`${em`width`}: ${label.ref('type-BookElementSize')`BookElementSize`} — ширина элемента относительно ширины книги`}
${item`${em`height`}: ${label.ref('type-BookElementSize')`BookElementSize`} — высота элемента относительно области видимости (именно области видимости, а не высоты книги, так как книга листается вертикально и её высота может быть сколь угодно велика)`}
`}
${end(area)}
`;
};
