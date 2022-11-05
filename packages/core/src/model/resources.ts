import { BookElements } from './elements';
import { getIterableBook } from './iterableBook';
import { BookElementSchema, BookSchema, BookItem } from './model';

type ResourceSchema = Omit<BookElementSchema, 'props'> & BookElements['resource'];

export type ResourceSettings = {
  src: string;
};

export type ResourceMap = Map<string, ResourceSettings>;

export function getResources(schema: BookSchema): ResourceSchema[] {
  const result: ResourceSchema[] = [];
  for (const item of getIterableBook(schema)) {
    if (typeof item === 'string') continue;
    if (!isValidResource(item)) continue;
    result.push(item);
  }
  return result;
}

export function isValidResource(resource: BookElementSchema): resource is ResourceSchema {
  if (resource.name !== 'resource') return false;
  const { path, src } = resource.props;
  return Boolean(path) && Boolean(src);
}

export function getResourceKey({ path, type }: { path: string; type?: string }): string {
  return `${type ? `${type}:` : ''}${path}`;
}

/**
 * @example
 *
 * ```ts
 * getPathWithPrefix('dir', 'path'); // 'dir/path'
 * getPathWithPrefix('dir', '/path'); // 'dir/path'
 * getPathWithPrefix('dir', './path'); // 'dir/path'
 * getPathWithPrefix('dir', '../path'); // 'dir/../path'
 * getPathWithPrefix('dir/', 'path'); // 'dir/path'
 * getPathWithPrefix('dir/', '/path'); // 'dir/path'
 * getPathWithPrefix('dir/', './path'); // 'dir/path'
 * getPathWithPrefix('dir/', '../path'); // 'dir/../path'
 * ```
 */
export function getPathWithPrefix(src: string, prefix: string): string {
  return `${prefix.replace(/\/$/, '')}/${src.replace(/^\.?\//, '')}`;
}

/**
 * priority: pathMap > rawPrefix > prefix > data in book schema
 */
export type ResourceOptions = {
  /**
   * <src> -> getPathWithPrefix(<src>, prefix)
   */
  prefix?: string;

  /**
   * <src> -> rawPrefix + <src>
   */
  rawPrefix?: string;

  /**
   * <src> -> pathMap.get(<path>)
   */
  pathMap?: ResourceMap;
};

export function getActualResourceMap({
  schema,
  resourceOptions,
}: {
  schema: BookSchema;
  resourceOptions?: ResourceOptions;
}): ResourceMap {
  const { prefix, pathMap, rawPrefix } = resourceOptions ?? {};
  const resources = getResources(schema);
  const actualMap: ResourceMap = new Map();
  for (const resource of resources) {
    const { path, src, type } = resource.props;

    const key = getResourceKey({ path, type });
    let settings: ResourceSettings = { src };

    const customSettings = pathMap?.get(key);
    if (customSettings) {
      settings = customSettings;
    } else if (prefix) {
      settings = { src: getPathWithPrefix(src, prefix) };
    } else if (rawPrefix) {
        settings = { src: `${rawPrefix}${src}` };
    }
    actualMap.set(key, settings);
  }
  return actualMap;
}

export function calculateResources(schema: BookSchema, resourceMap: ResourceMap = new Map()): void {
  for (const item of schema) {
    if (typeof item === 'string') continue;

    if ('src' in item.props && typeof item.props.src === 'string' && item.props.src.startsWith('/')) {
      // локальный путь
      const localPath = item.props.src;
      const resourcePath = getResourceKey({ type: item.name, path: localPath });
      const typeSrc = resourceMap.get(resourcePath)?.src;
      const src = resourceMap.get(localPath)?.src;
      if (!src && !typeSrc) {
        // FIXME: добавить предупреждения в книгу
        console.error(`Unknown resource ${item.props.src}`);
      }
      item.props.src = typeSrc ?? src ?? item.props.src;
    }
    calculateResources(item.children, resourceMap);
  }
}
