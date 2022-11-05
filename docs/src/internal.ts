import type { FBook } from '@bookbox/preset-web';

import {Model} from './model';
import {Generator} from './generator';
import {View} from './view';

const pipeline = './pipeline.svg';

export const Internal: FBook = api => {
    const { header, book, image, resource } = api;

    return book`
${resource.type('image').path('/pipeline.svg').src(pipeline)}

${header.level(2)`Внутреннее устройство книги`}

Схематически устройство можно представить так

${image.src('/pipeline.svg').alt('BookBox pipeline')`Генератор ➞ Модель ➞ Представление`}

${Model(api)}


${Generator(api)}


${View(api)}
`;
};
