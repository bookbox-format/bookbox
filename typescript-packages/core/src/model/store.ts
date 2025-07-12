import { ExternalBuilder } from './external';
import { BookBuilder, BookElementSchema, BookSchema, BookStore, BuildTokens } from './model';

export function getStore<T>({
  builder,
  schema,
  externalBuilder,
  getBuild,
}: {
  schema: BookSchema;
  builder: BookBuilder<T>;
  externalBuilder?: ExternalBuilder<T>;
  getBuild(currentStore: BookStore<T>): BuildTokens<T>;
}): BookStore<T> {
  const result: BookStore<T> = {
    dataByKeys: {},
    elementsByKeys: getElementsByKeys(schema),
  };
  const writeDataByKey = (key: string) =>
    (result.dataByKeys[key] = builder({
      schema: [result.elementsByKeys[key]],
      store: result,
      externalBuilder,
      build: getBuild(result),
    }));
  const keys = Object.keys(result.elementsByKeys);
  for (let g = 0; g < 2; g++) {
    for (let i = 0; i < keys.length; i++) {
      writeDataByKey(keys[i]);
    }
    for (let i = keys.length - 1; i >= 0; i--) {
      writeDataByKey(keys[i]);
    }
  }

  return result;
}

export function getElementsByKeys(schema: BookSchema): Record<string, BookElementSchema> {
  let result: Record<string, BookElementSchema> = {};
  for (const item of schema) {
    if (typeof item === 'string') {
      continue;
    }
    result[item.props.key as string] = item;
    const childrenRecord = getElementsByKeys(item.children);
    result = {
      ...result,
      ...childrenRecord,
    };
  }
  return result;
}
