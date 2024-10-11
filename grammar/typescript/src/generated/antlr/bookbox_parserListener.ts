// Generated from bookbox_parser.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { FileContext } from "./bookbox_parser.js";
import { File_blockContext } from "./bookbox_parser.js";
import { BodyContext } from "./bookbox_parser.js";
import { BlockContext } from "./bookbox_parser.js";
import { TextContext } from "./bookbox_parser.js";
import { Tag_blockContext } from "./bookbox_parser.js";
import { Tag_bodyContext } from "./bookbox_parser.js";
import { NameContext } from "./bookbox_parser.js";
import { AttrContext } from "./bookbox_parser.js";
import { Attr_textContext } from "./bookbox_parser.js";
import { Include_blockContext } from "./bookbox_parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `bookbox_parser`.
 */
export default class bookbox_parserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `bookbox_parser.file`.
	 * @param ctx the parse tree
	 */
	enterFile?: (ctx: FileContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.file`.
	 * @param ctx the parse tree
	 */
	exitFile?: (ctx: FileContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.file_block`.
	 * @param ctx the parse tree
	 */
	enterFile_block?: (ctx: File_blockContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.file_block`.
	 * @param ctx the parse tree
	 */
	exitFile_block?: (ctx: File_blockContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.body`.
	 * @param ctx the parse tree
	 */
	enterBody?: (ctx: BodyContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.body`.
	 * @param ctx the parse tree
	 */
	exitBody?: (ctx: BodyContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.text`.
	 * @param ctx the parse tree
	 */
	enterText?: (ctx: TextContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.text`.
	 * @param ctx the parse tree
	 */
	exitText?: (ctx: TextContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.tag_block`.
	 * @param ctx the parse tree
	 */
	enterTag_block?: (ctx: Tag_blockContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.tag_block`.
	 * @param ctx the parse tree
	 */
	exitTag_block?: (ctx: Tag_blockContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.tag_body`.
	 * @param ctx the parse tree
	 */
	enterTag_body?: (ctx: Tag_bodyContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.tag_body`.
	 * @param ctx the parse tree
	 */
	exitTag_body?: (ctx: Tag_bodyContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.name`.
	 * @param ctx the parse tree
	 */
	enterName?: (ctx: NameContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.name`.
	 * @param ctx the parse tree
	 */
	exitName?: (ctx: NameContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.attr`.
	 * @param ctx the parse tree
	 */
	enterAttr?: (ctx: AttrContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.attr`.
	 * @param ctx the parse tree
	 */
	exitAttr?: (ctx: AttrContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.attr_text`.
	 * @param ctx the parse tree
	 */
	enterAttr_text?: (ctx: Attr_textContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.attr_text`.
	 * @param ctx the parse tree
	 */
	exitAttr_text?: (ctx: Attr_textContext) => void;
	/**
	 * Enter a parse tree produced by `bookbox_parser.include_block`.
	 * @param ctx the parse tree
	 */
	enterInclude_block?: (ctx: Include_blockContext) => void;
	/**
	 * Exit a parse tree produced by `bookbox_parser.include_block`.
	 * @param ctx the parse tree
	 */
	exitInclude_block?: (ctx: Include_blockContext) => void;
}

