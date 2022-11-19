import { createHtmlBook, css, browserInit, render } from '../../src';

browserInit();
css.math();
css.code();

import('../elements-list.json').then(schema => {
  render({ element: document.body.querySelector('main')!, bookData: createHtmlBook({ schema: schema.default }) });
});
