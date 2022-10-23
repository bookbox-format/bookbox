import katex from "katex";

export function renderFormula(text: string, isBlock = false) {
  return katex.renderToString(text, {
    displayMode: isBlock,
    throwOnError: false,
    output: "html",
  });
}
