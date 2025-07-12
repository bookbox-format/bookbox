import { parse } from '../model';
import { Block, Body } from '../generated';

export async function readMarkup(path: string): Promise<Body> {
  const { readFile } = await import('node:fs/promises');
  const text = await readFile(path, { encoding: 'utf-8' });
  const ast = parse(text);
  if (text.includes('#import')) return resolveImports(ast, path);
  return ast;
}

export async function resolveImports(ast: Body, parentPath: string): Promise<Body> {
  const { dirname, resolve } = await import('node:path');
  const resultAst: Body = { blocks: [] };
  const bodiesPromises: (Promise<Body> | Body)[] = [];
  let currentBlocks: Block[] = [];
  const saveBlocks = () => {
    if (currentBlocks.length > 0) {
      bodiesPromises.push({ blocks: currentBlocks });
      currentBlocks = [];
    }
  };

  for (const block of ast.blocks) {
    const name = block.tag?.name;
    if (name === '#import') {
      const childPath = block.tag?.body?.blocks
        .filter(x => x.text)
        .map(x => x.text)
        .join('');
      if (!childPath) continue;
      saveBlocks();
      const childAst = readMarkup(resolve(dirname(parentPath), childPath));
      bodiesPromises.push(childAst);
    } else if (block.tag?.body) {
      saveBlocks();
      const tagAst = resolveImports(block.tag.body, parentPath);
      bodiesPromises.push(tagAst.then(body => ({ blocks: [{ tag: { ...block.tag, body } } as Block] })));
    } else {
      currentBlocks.push(block);
    }
  }
  saveBlocks();

  for (const result of await Promise.allSettled(bodiesPromises)) {
    if (result.status === 'fulfilled') {
      resultAst.blocks.push(...result.value.blocks);
    } else {
      resultAst.blocks.push({
        error: {
          value: 'the import cannot be added',
          message: String(result.reason),
        },
      });
    }
  }

  return resultAst;
}
