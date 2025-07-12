import { BookSchema } from '@bookbox/core';
import { Body, readMarkup } from '@bookbox/markup';
import { getBookSchema } from './model';
import { expandDefinitions, parseDefinitions } from './definitions';

export function getBookSchemaWithDefinitions(body: Body): BookSchema {
  const textDefinitions = parseDefinitions(body);
  let schema = getBookSchema(body);
  if (Object.keys(textDefinitions).length === 0) return schema;
  schema = expandDefinitions(schema, textDefinitions);
  return schema;
}

export async function readBook(path: string): Promise<BookSchema> {
  const body = await readMarkup(path);
  return getBookSchemaWithDefinitions(body);
}
