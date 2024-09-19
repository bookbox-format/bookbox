import { codeCssText } from './generated/code_css';
import { htmlBookCssText } from './generated/htmlBook_css';
import { katexCssText } from './generated/katex_css';
import { katexFontsAllCssText } from './generated/katexFontsAll_css';

import { getBrowserCssApi, getCssApiForList } from './utils';

/**
 * main bookbox css
 */
export const htmlBook = getBrowserCssApi(htmlBookCssText);

/**
 * css for code
 */
export const code = getBrowserCssApi(codeCssText);

// math
export const katex = getBrowserCssApi(katexCssText);
export const katexFontsAll = getBrowserCssApi(katexFontsAllCssText);

/**
 * css for math
 */
export const math = getCssApiForList([katex, katexFontsAll]);

/**
 * css for main styles, code and math
 */
export const all = getCssApiForList([code, htmlBook, math]);
