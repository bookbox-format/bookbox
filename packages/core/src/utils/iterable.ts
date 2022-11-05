export type IterableGetterOptions<T> = {
  getChildren: (node: T) => T[];
  isLeaf: (node: T) => boolean;
};

export function iterableTreeGetter<T>(options: IterableGetterOptions<T>) {
  const { getChildren, isLeaf } = options;
  return function* iterableTree(schema: T[]): Iterable<T> {
    for (const item of schema) {
      yield item;
      if (isLeaf(item)) continue;
      yield* iterableTree(getChildren(item));
    }
  };
}
