import { BookSchema } from '../model';

export function print(schema: BookSchema): string {
  return schema.map(x => (typeof x === 'string' ? x : print(x.children))).join('');
}
