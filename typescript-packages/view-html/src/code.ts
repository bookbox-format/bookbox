import { HtmlToken } from "./model";
import hljs from 'highlight.js';

interface CodeOptions {
  text: string;
  lang?: string;
}

export function renderColorCode(options: CodeOptions): HtmlToken {
  const {text, lang} = options;
  let preparedCode = text;
  if (lang) {
      try {
        preparedCode = hljs.highlight(preparedCode, {language: lang}).value;
      } finally {}
  }
  return preparedCode;
}
