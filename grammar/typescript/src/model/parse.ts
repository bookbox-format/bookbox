import { CharStream, CommonTokenStream } from 'antlr4';
import { BookboxLexer, BookboxParser } from '../generated/antlr';
import { Body } from '../generated';
import { prepareFile } from './ast';

function getTokensStream(text: string): CommonTokenStream {
  const chars = new CharStream(text);
  const lexer = new BookboxLexer(chars);
  const tokens = new CommonTokenStream(lexer);

  return tokens;
}

export function parse(text: string): Body {
  const tokens = getTokensStream(text);
  const parser = new BookboxParser(tokens);
  const file = parser.file();

  return prepareFile(file);
}

export function getTokens(text: string): Array<[string, string]> {
  const tokens = getTokensStream(text);

  return tokens.tokens.map(token => [token.text, BookboxLexer.symbolicNames[token.type] ?? '']);
}
