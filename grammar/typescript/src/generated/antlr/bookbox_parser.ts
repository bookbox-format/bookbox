// Generated from bookbox_parser.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import bookbox_parserListener from "./bookbox_parserListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class bookbox_parser extends Parser {
	public static readonly ESC = 1;
	public static readonly DOUBLE_OPEN = 2;
	public static readonly OPEN = 3;
	public static readonly CLOSE = 4;
	public static readonly TEXT = 5;
	public static readonly SYSTEM_FLAG = 6;
	public static readonly NAME = 7;
	public static readonly DOT = 8;
	public static readonly ATTR_OPEN = 9;
	public static readonly SEPARATOR = 10;
	public static readonly UNKNOWN = 11;
	public static readonly ATTR_ESC = 12;
	public static readonly ATTR_CLOSE = 13;
	public static readonly ATTR_TEXT = 14;
	public static readonly DOUBLE_CLOSE = 15;
	public static readonly INCLUDE_TEXT = 16;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_file = 0;
	public static readonly RULE_file_block = 1;
	public static readonly RULE_body = 2;
	public static readonly RULE_block = 3;
	public static readonly RULE_text = 4;
	public static readonly RULE_tag_block = 5;
	public static readonly RULE_name = 6;
	public static readonly RULE_attr = 7;
	public static readonly RULE_attr_text = 8;
	public static readonly RULE_include_block = 9;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'{{'", null, 
                                                            null, null, 
                                                            "'#'", null, 
                                                            "'.'", null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'}}'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "ESC", 
                                                             "DOUBLE_OPEN", 
                                                             "OPEN", "CLOSE", 
                                                             "TEXT", "SYSTEM_FLAG", 
                                                             "NAME", "DOT", 
                                                             "ATTR_OPEN", 
                                                             "SEPARATOR", 
                                                             "UNKNOWN", 
                                                             "ATTR_ESC", 
                                                             "ATTR_CLOSE", 
                                                             "ATTR_TEXT", 
                                                             "DOUBLE_CLOSE", 
                                                             "INCLUDE_TEXT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"file", "file_block", "body", "block", "text", "tag_block", "name", "attr", 
		"attr_text", "include_block",
	];
	public get grammarFileName(): string { return "bookbox_parser.g4"; }
	public get literalNames(): (string | null)[] { return bookbox_parser.literalNames; }
	public get symbolicNames(): (string | null)[] { return bookbox_parser.symbolicNames; }
	public get ruleNames(): string[] { return bookbox_parser.ruleNames; }
	public get serializedATN(): number[] { return bookbox_parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, bookbox_parser._ATN, bookbox_parser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public file(): FileContext {
		let localctx: FileContext = new FileContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, bookbox_parser.RULE_file);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 23;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 62) !== 0)) {
				{
				{
				this.state = 20;
				this.file_block();
				}
				}
				this.state = 25;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public file_block(): File_blockContext {
		let localctx: File_blockContext = new File_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, bookbox_parser.RULE_file_block);
		try {
			this.state = 28;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 5:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 26;
				this.block();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 27;
				this.match(bookbox_parser.CLOSE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public body(): BodyContext {
		let localctx: BodyContext = new BodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, bookbox_parser.RULE_body);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 33;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 46) !== 0)) {
				{
				{
				this.state = 30;
				this.block();
				}
				}
				this.state = 35;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, bookbox_parser.RULE_block);
		try {
			this.state = 39;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 36;
				this.include_block();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 37;
				this.tag_block();
				}
				break;
			case 1:
			case 5:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 38;
				this.text();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public text(): TextContext {
		let localctx: TextContext = new TextContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, bookbox_parser.RULE_text);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 42;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 41;
					_la = this._input.LA(1);
					if(!(_la===1 || _la===5)) {
					this._errHandler.recoverInline(this);
					}
					else {
						this._errHandler.reportMatch(this);
					    this.consume();
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 44;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 4, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tag_block(): Tag_blockContext {
		let localctx: Tag_blockContext = new Tag_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, bookbox_parser.RULE_tag_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 46;
			this.match(bookbox_parser.OPEN);
			this.state = 47;
			this.name();
			this.state = 51;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 48;
				this.attr();
				}
				}
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 54;
			this.match(bookbox_parser.SEPARATOR);
			this.state = 55;
			this.body();
			this.state = 56;
			this.match(bookbox_parser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public name(): NameContext {
		let localctx: NameContext = new NameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, bookbox_parser.RULE_name);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 58;
				this.match(bookbox_parser.SYSTEM_FLAG);
				}
			}

			this.state = 61;
			this.match(bookbox_parser.NAME);
			this.state = 66;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 62;
					this.match(bookbox_parser.DOT);
					this.state = 63;
					this.match(bookbox_parser.NAME);
					}
					}
				}
				this.state = 68;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public attr(): AttrContext {
		let localctx: AttrContext = new AttrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, bookbox_parser.RULE_attr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 69;
			this.match(bookbox_parser.DOT);
			this.state = 70;
			this.match(bookbox_parser.NAME);
			this.state = 71;
			this.match(bookbox_parser.ATTR_OPEN);
			this.state = 72;
			this.attr_text();
			this.state = 73;
			this.match(bookbox_parser.ATTR_CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public attr_text(): Attr_textContext {
		let localctx: Attr_textContext = new Attr_textContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, bookbox_parser.RULE_attr_text);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 78;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===12 || _la===14) {
				{
				{
				this.state = 75;
				_la = this._input.LA(1);
				if(!(_la===12 || _la===14)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 80;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public include_block(): Include_blockContext {
		let localctx: Include_blockContext = new Include_blockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, bookbox_parser.RULE_include_block);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 81;
			this.match(bookbox_parser.DOUBLE_OPEN);
			this.state = 82;
			this.match(bookbox_parser.INCLUDE_TEXT);
			this.state = 83;
			this.match(bookbox_parser.DOUBLE_CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,16,86,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,1,
	0,5,0,22,8,0,10,0,12,0,25,9,0,1,1,1,1,3,1,29,8,1,1,2,5,2,32,8,2,10,2,12,
	2,35,9,2,1,3,1,3,1,3,3,3,40,8,3,1,4,4,4,43,8,4,11,4,12,4,44,1,5,1,5,1,5,
	5,5,50,8,5,10,5,12,5,53,9,5,1,5,1,5,1,5,1,5,1,6,3,6,60,8,6,1,6,1,6,1,6,
	5,6,65,8,6,10,6,12,6,68,9,6,1,7,1,7,1,7,1,7,1,7,1,7,1,8,5,8,77,8,8,10,8,
	12,8,80,9,8,1,9,1,9,1,9,1,9,1,9,0,0,10,0,2,4,6,8,10,12,14,16,18,0,2,2,0,
	1,1,5,5,2,0,12,12,14,14,85,0,23,1,0,0,0,2,28,1,0,0,0,4,33,1,0,0,0,6,39,
	1,0,0,0,8,42,1,0,0,0,10,46,1,0,0,0,12,59,1,0,0,0,14,69,1,0,0,0,16,78,1,
	0,0,0,18,81,1,0,0,0,20,22,3,2,1,0,21,20,1,0,0,0,22,25,1,0,0,0,23,21,1,0,
	0,0,23,24,1,0,0,0,24,1,1,0,0,0,25,23,1,0,0,0,26,29,3,6,3,0,27,29,5,4,0,
	0,28,26,1,0,0,0,28,27,1,0,0,0,29,3,1,0,0,0,30,32,3,6,3,0,31,30,1,0,0,0,
	32,35,1,0,0,0,33,31,1,0,0,0,33,34,1,0,0,0,34,5,1,0,0,0,35,33,1,0,0,0,36,
	40,3,18,9,0,37,40,3,10,5,0,38,40,3,8,4,0,39,36,1,0,0,0,39,37,1,0,0,0,39,
	38,1,0,0,0,40,7,1,0,0,0,41,43,7,0,0,0,42,41,1,0,0,0,43,44,1,0,0,0,44,42,
	1,0,0,0,44,45,1,0,0,0,45,9,1,0,0,0,46,47,5,3,0,0,47,51,3,12,6,0,48,50,3,
	14,7,0,49,48,1,0,0,0,50,53,1,0,0,0,51,49,1,0,0,0,51,52,1,0,0,0,52,54,1,
	0,0,0,53,51,1,0,0,0,54,55,5,10,0,0,55,56,3,4,2,0,56,57,5,4,0,0,57,11,1,
	0,0,0,58,60,5,6,0,0,59,58,1,0,0,0,59,60,1,0,0,0,60,61,1,0,0,0,61,66,5,7,
	0,0,62,63,5,8,0,0,63,65,5,7,0,0,64,62,1,0,0,0,65,68,1,0,0,0,66,64,1,0,0,
	0,66,67,1,0,0,0,67,13,1,0,0,0,68,66,1,0,0,0,69,70,5,8,0,0,70,71,5,7,0,0,
	71,72,5,9,0,0,72,73,3,16,8,0,73,74,5,13,0,0,74,15,1,0,0,0,75,77,7,1,0,0,
	76,75,1,0,0,0,77,80,1,0,0,0,78,76,1,0,0,0,78,79,1,0,0,0,79,17,1,0,0,0,80,
	78,1,0,0,0,81,82,5,2,0,0,82,83,5,16,0,0,83,84,5,15,0,0,84,19,1,0,0,0,9,
	23,28,33,39,44,51,59,66,78];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!bookbox_parser.__ATN) {
			bookbox_parser.__ATN = new ATNDeserializer().deserialize(bookbox_parser._serializedATN);
		}

		return bookbox_parser.__ATN;
	}


	static DecisionsToDFA = bookbox_parser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class FileContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public file_block_list(): File_blockContext[] {
		return this.getTypedRuleContexts(File_blockContext) as File_blockContext[];
	}
	public file_block(i: number): File_blockContext {
		return this.getTypedRuleContext(File_blockContext, i) as File_blockContext;
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_file;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterFile) {
	 		listener.enterFile(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitFile) {
	 		listener.exitFile(this);
		}
	}
}


export class File_blockContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.CLOSE, 0);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_file_block;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterFile_block) {
	 		listener.enterFile_block(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitFile_block) {
	 		listener.exitFile_block(this);
		}
	}
}


export class BodyContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public block_list(): BlockContext[] {
		return this.getTypedRuleContexts(BlockContext) as BlockContext[];
	}
	public block(i: number): BlockContext {
		return this.getTypedRuleContext(BlockContext, i) as BlockContext;
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_body;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterBody) {
	 		listener.enterBody(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitBody) {
	 		listener.exitBody(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public include_block(): Include_blockContext {
		return this.getTypedRuleContext(Include_blockContext, 0) as Include_blockContext;
	}
	public tag_block(): Tag_blockContext {
		return this.getTypedRuleContext(Tag_blockContext, 0) as Tag_blockContext;
	}
	public text(): TextContext {
		return this.getTypedRuleContext(TextContext, 0) as TextContext;
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_block;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterBlock) {
	 		listener.enterBlock(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitBlock) {
	 		listener.exitBlock(this);
		}
	}
}


export class TextContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TEXT_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.TEXT);
	}
	public TEXT(i: number): TerminalNode {
		return this.getToken(bookbox_parser.TEXT, i);
	}
	public ESC_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.ESC);
	}
	public ESC(i: number): TerminalNode {
		return this.getToken(bookbox_parser.ESC, i);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_text;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterText) {
	 		listener.enterText(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitText) {
	 		listener.exitText(this);
		}
	}
}


export class Tag_blockContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPEN(): TerminalNode {
		return this.getToken(bookbox_parser.OPEN, 0);
	}
	public name(): NameContext {
		return this.getTypedRuleContext(NameContext, 0) as NameContext;
	}
	public SEPARATOR(): TerminalNode {
		return this.getToken(bookbox_parser.SEPARATOR, 0);
	}
	public body(): BodyContext {
		return this.getTypedRuleContext(BodyContext, 0) as BodyContext;
	}
	public CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.CLOSE, 0);
	}
	public attr_list(): AttrContext[] {
		return this.getTypedRuleContexts(AttrContext) as AttrContext[];
	}
	public attr(i: number): AttrContext {
		return this.getTypedRuleContext(AttrContext, i) as AttrContext;
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_tag_block;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterTag_block) {
	 		listener.enterTag_block(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitTag_block) {
	 		listener.exitTag_block(this);
		}
	}
}


export class NameContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NAME_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.NAME);
	}
	public NAME(i: number): TerminalNode {
		return this.getToken(bookbox_parser.NAME, i);
	}
	public SYSTEM_FLAG(): TerminalNode {
		return this.getToken(bookbox_parser.SYSTEM_FLAG, 0);
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(bookbox_parser.DOT, i);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_name;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterName) {
	 		listener.enterName(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitName) {
	 		listener.exitName(this);
		}
	}
}


export class AttrContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOT(): TerminalNode {
		return this.getToken(bookbox_parser.DOT, 0);
	}
	public NAME(): TerminalNode {
		return this.getToken(bookbox_parser.NAME, 0);
	}
	public ATTR_OPEN(): TerminalNode {
		return this.getToken(bookbox_parser.ATTR_OPEN, 0);
	}
	public attr_text(): Attr_textContext {
		return this.getTypedRuleContext(Attr_textContext, 0) as Attr_textContext;
	}
	public ATTR_CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.ATTR_CLOSE, 0);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_attr;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterAttr) {
	 		listener.enterAttr(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitAttr) {
	 		listener.exitAttr(this);
		}
	}
}


export class Attr_textContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ATTR_TEXT_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.ATTR_TEXT);
	}
	public ATTR_TEXT(i: number): TerminalNode {
		return this.getToken(bookbox_parser.ATTR_TEXT, i);
	}
	public ATTR_ESC_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.ATTR_ESC);
	}
	public ATTR_ESC(i: number): TerminalNode {
		return this.getToken(bookbox_parser.ATTR_ESC, i);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_attr_text;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterAttr_text) {
	 		listener.enterAttr_text(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitAttr_text) {
	 		listener.exitAttr_text(this);
		}
	}
}


export class Include_blockContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOUBLE_OPEN(): TerminalNode {
		return this.getToken(bookbox_parser.DOUBLE_OPEN, 0);
	}
	public INCLUDE_TEXT(): TerminalNode {
		return this.getToken(bookbox_parser.INCLUDE_TEXT, 0);
	}
	public DOUBLE_CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.DOUBLE_CLOSE, 0);
	}
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_include_block;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterInclude_block) {
	 		listener.enterInclude_block(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitInclude_block) {
	 		listener.exitInclude_block(this);
		}
	}
}
