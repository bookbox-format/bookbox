import { ExternalBuilder } from './external';
import { BookBuilder, BookElementSchema, BookSchema, BookStore } from './model';

export function getStore<T>({
  builder,
  schema,
  externalBuilder,
}: {
  schema: BookSchema;
  builder: BookBuilder<T>;
  externalBuilder?: ExternalBuilder<T>;
}): BookStore<T> {
  const result: BookStore<T> = {
    dataByKeys: {},
    elementsByKeys: getElementsByKeys(schema),
  };
  for (const [key, elem] of Object.entries(result.elementsByKeys)) {
    // FIXME: поздние ключи могут использовать более ранние, но не наоборот
    result.dataByKeys[key] = builder({
      schema: [elem],
      store: result,
      externalBuilder,
    });
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
