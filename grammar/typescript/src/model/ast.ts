import { ParserRuleContext, TerminalNode } from 'antlr4';
import {
  Tag_blockContext,
  BlockContext,
  TextContext,
  Include_blockContext,
  BodyContext,
  FileContext,
} from '../generated/antlr';

import { Attribute, Block, Body } from '../generated';

function prepareToken(token: TerminalNode) {
  const exist = token.symbol.tokenIndex !== -1;
  return exist ? token.getText() : '';
}

function preparePart(context: ParserRuleContext | null) {
  if (!context) return '';
  if (context.exception) {
    return context.getText();
  }
  return context.getText();
}

function getReservedText<T extends ParserRuleContext>(context: T, getStandartText: (c: T) => string) {
  let reserveText: string = '';
  try {
    reserveText = getStandartText(context);
  } catch (e) {
    reserveText = context.getText();
  }
  if (reserveText === '') {
    reserveText = context.getText();
  }

  return reserveText;
}

function getStandartTagBlock(context: Tag_blockContext) {
  return (
    prepareToken(context.OPEN()) +
    preparePart(context.name()) +
    context.attr_list().map(preparePart).join('') +
    (context.tag_body() ? preparePart(context.tag_body()) : '}')
  );
}

function error(value: string): Block {
  return {
    error: {
      value,
    },
  };
}

function prepareBlock(ctx: BlockContext): Block {
  const text: TextContext | null = ctx.text();
  const includeBlock: Include_blockContext | null = ctx.include_block();
  const tagBlock: Tag_blockContext | null = ctx.tag_block();

  if (text) {
    return { text: text.getText() };
  } else if (includeBlock) {
    const value = includeBlock
      .INCLUDE_TEXT_list()
      .map(node => node.getText())
      .join('');
    return {
      include: {
        value: value,
      },
    };
  } else if (tagBlock) {
    const reserveText = getReservedText(tagBlock, getStandartTagBlock);

    try {
      const name = tagBlock.name().getText();
      if (name === '') return error(reserveText);
      const tagBody = tagBlock.tag_body();
      const separator = tagBody?.SEPARATOR()?.getText() ?? '';
      const body = prepareBody(tagBody?.body() ?? null);
      const attrList: Attribute[] = tagBlock
        .attr_list()
        .filter(attr => !attr.exception)
        .map(attr => {
          const name = attr.NAME().getText();
          const value = attr.attr_text()?.getText();
          return {
            name,
            value: value ?? '',
            empty: !value,
          };
        });

      const result: Block = {
        tag: {
          name,
          body,
          attrList,
          separator,
        },
      };

      return result;
    } catch (e: any) {
      return error(reserveText);
    }
  }

  return error(ctx.getText());
}

function prepareBody(ctx: BodyContext | null): Body {
  const blocks: Block[] = [];

  for (const block of ctx?.block_list() ?? []) {
    blocks.push(prepareBlock(block));
  }

  return { blocks };
}

export function prepareFile(ctx: FileContext): Body {
  const blocks: Block[] = [];

  for (const fileBlock of ctx.file_block_list()) {
    const block: BlockContext | null = fileBlock.block();
    const close: TerminalNode | null = fileBlock.CLOSE();

    if (block) {
      blocks.push(prepareBlock(block));
    } else if (close) {
      blocks.push({ text: close.getText() });
    }
  }

  return { blocks };
}
