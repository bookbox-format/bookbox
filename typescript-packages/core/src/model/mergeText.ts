import { BookSchema } from './model';

export function mergeText(schema: BookSchema): BookSchema {
  const result: BookSchema = [];

  let texts: (string | null)[] = [];
  const saveText = () => {
    if (texts.length > 0) {
      let last: string | null = '';
      let chainText = '';
      const chains: string[] = [];
      for (const text of texts) {
        if (last !== null && text === null) {
          // start chain
          chainText = last.endsWith('\n') ? last.slice(0, last.length - 1) : last;
          chains.push(chainText);
        } else if (last === null && text !== null && text !== '\n') {
          // end chain
          chainText = text.startsWith('\n') ? text.slice(1) : text;
          chains.push(chainText);
          continue;
        } else if (last !== null && text !== null) {
          // text
          chains.push(last);
        } else if (last === null && text === '\n') {
          continue;
        }
        last = text;
      }
      if (last !== null) chains.push(last);

      const text = chains.join('').replace(/\n\n\n\n+/g, '\n\n\n');
      if (text !== '') result.push(text);
      texts = [];
    }
  };

  for (const item of schema) {
    if (typeof item === 'string') {
      if (item !== '') {
        if (texts.length > 0 && texts[texts.length - 1] !== null) {
          texts[texts.length - 1] += item;
        } else {
          texts.push(item);
        }
      }
    } else if (item.name === 'hole') {
      texts.push(null);
    } else {
      saveText();
      item.children = mergeText(item.children);
      result.push(item);
    }
  }
  saveText();

  return result;
}
