// @ts-ignore

import { renderToString } from "katex";

export function renderFormula(text: string, isBlock = false) {
  return renderToString(text, {
    displayMode: isBlock,
    throwOnError: false,
    output: "html",
  });
}
