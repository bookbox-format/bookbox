import { iterableTreeGetter } from '../utils';
import { BookItem } from './model';

export const getIterableBook = iterableTreeGetter<BookItem>({
  getChildren: item => (typeof item !== 'string' ? item.children : []),
  isLeaf: item => typeof item === 'string',
});
