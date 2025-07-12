import { createHtmlBook, css, browserInit, render } from '../../src';

browserInit();
css.math();
css.code();

import('../elements-list.json').then(schema => {
  render({
    element: document.body.querySelector('main')!,
    bookData: createHtmlBook({ schema: schema.default }),
    settingsOptions: {
      custom: {
        order: {
          icon: 'or',
          getItems: data => {
            const store = data.bookData.store;
            const lists = Object.entries(store.elementsByKeys)
              .filter(([key, el]) => {
                return el.name === 'code';
              })
              .map(([key]) => key);

            console.log({ store, lists });

            return lists.map(x => ({ key: x, value: store.dataByKeys[x] }));
          },
        },
      },
    },
  });
});
