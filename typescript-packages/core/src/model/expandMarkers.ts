import { BookElementSchema, BookItem, BookSchema } from './model';

/**
 * Составление дерева с учётом границ
 */
export function expandMarkers(schema: BookSchema): BookSchema {
  const result: BookSchema = [];
  const stack: BookElementSchema[] = [];

  // куда класть текущие элементы
  const getTarget = () => (stack.length > 0 ? stack[stack.length - 1].children : result);
  const push = (item: BookItem) => getTarget().push(item);

  for (const item of schema) {
    if (typeof item === 'string') {
      push(item);
    } else if (item.marker === 'start') {
      // текущая область
      delete item.marker;
      stack.push(item);
    } else if (item.marker === 'end') {
      const elem = stack.pop();
      // TODO: определять вложенность по имени
      if (elem) push(elem);
    } else {
      item.children = expandMarkers(item.children);
      push(item);
    }
  }

  // замыкаем остатки стека
  while (stack.length > 0) {
    const elem = stack.pop()!;
    push(elem);
  }

  return result;
}
