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
	public static readonly INCLUDE_OPEN = 2;
	public static readonly OPEN = 3;
	public static readonly CLOSE = 4;
	public static readonly TEXT = 5;
	public static readonly SYSTEM_FLAG = 6;
	public static readonly NAME = 7;
	public static readonly DOT = 8;
	public static readonly COLON = 9;
	public static readonly ATTR_OPEN = 10;
	public static readonly SEPARATOR = 11;
	public static readonly SELF_CLOSE = 12;
	public static readonly UNKNOWN = 13;
	public static readonly ATTR_ESC = 14;
	public static readonly ATTR_CLOSE = 15;
	public static readonly ATTR_TEXT = 16;
	public static readonly INCLUDE_CLOSE = 17;
	public static readonly INCLUDE_TEXT = 18;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_file = 0;
	public static readonly RULE_file_block = 1;
	public static readonly RULE_body = 2;
	public static readonly RULE_block = 3;
	public static readonly RULE_text = 4;
	public static readonly RULE_tag_block = 5;
	public static readonly RULE_tag_body = 6;
	public static readonly RULE_name = 7;
	public static readonly RULE_attr = 8;
	public static readonly RULE_attr_text = 9;
	public static readonly RULE_include_block = 10;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'{{'", null, 
                                                            null, null, 
                                                            "'#'", null, 
                                                            "'.'", "':'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'}}'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "ESC", 
                                                             "INCLUDE_OPEN", 
                                                             "OPEN", "CLOSE", 
                                                             "TEXT", "SYSTEM_FLAG", 
                                                             "NAME", "DOT", 
                                                             "COLON", "ATTR_OPEN", 
                                                             "SEPARATOR", 
                                                             "SELF_CLOSE", 
                                                             "UNKNOWN", 
                                                             "ATTR_ESC", 
                                                             "ATTR_CLOSE", 
                                                             "ATTR_TEXT", 
                                                             "INCLUDE_CLOSE", 
                                                             "INCLUDE_TEXT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"file", "file_block", "body", "block", "text", "tag_block", "tag_body", 
		"name", "attr", "attr_text", "include_block",
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
			this.state = 25;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 62) !== 0)) {
				{
				{
				this.state = 22;
				this.file_block();
				}
				}
				this.state = 27;
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
			this.state = 30;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 1:
			case 2:
			case 3:
			case 5:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 28;
				this.block();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 29;
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
			this.state = 35;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 46) !== 0)) {
				{
				{
				this.state = 32;
				this.block();
				}
				}
				this.state = 37;
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
			this.state = 41;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 2:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 38;
				this.include_block();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 39;
				this.tag_block();
				}
				break;
			case 1:
			case 5:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 40;
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
			this.state = 44;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 43;
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
				this.state = 46;
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
			this.state = 48;
			this.match(bookbox_parser.OPEN);
			this.state = 49;
			this.name();
			this.state = 53;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===8) {
				{
				{
				this.state = 50;
				this.attr();
				}
				}
				this.state = 55;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 58;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
				{
				this.state = 56;
				this.tag_body();
				}
				break;
			case 12:
				{
				this.state = 57;
				this.match(bookbox_parser.SELF_CLOSE);
				}
				break;
			default:
				throw new NoViableAltException(this);
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
	public tag_body(): Tag_bodyContext {
		let localctx: Tag_bodyContext = new Tag_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, bookbox_parser.RULE_tag_body);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 60;
			this.match(bookbox_parser.SEPARATOR);
			this.state = 61;
			this.body();
			this.state = 62;
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
		this.enterRule(localctx, 14, bookbox_parser.RULE_name);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 65;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===6) {
				{
				this.state = 64;
				this.match(bookbox_parser.SYSTEM_FLAG);
				}
			}

			this.state = 67;
			this.match(bookbox_parser.NAME);
			this.state = 72;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===9) {
				{
				{
				this.state = 68;
				this.match(bookbox_parser.COLON);
				this.state = 69;
				this.match(bookbox_parser.NAME);
				}
				}
				this.state = 74;
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
	public attr(): AttrContext {
		let localctx: AttrContext = new AttrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, bookbox_parser.RULE_attr);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 75;
			this.match(bookbox_parser.DOT);
			this.state = 76;
			this.match(bookbox_parser.NAME);
			this.state = 81;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===10) {
				{
				this.state = 77;
				this.match(bookbox_parser.ATTR_OPEN);
				this.state = 78;
				this.attr_text();
				this.state = 79;
				this.match(bookbox_parser.ATTR_CLOSE);
				}
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
	public attr_text(): Attr_textContext {
		let localctx: Attr_textContext = new Attr_textContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, bookbox_parser.RULE_attr_text);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 86;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===14 || _la===16) {
				{
				{
				this.state = 83;
				_la = this._input.LA(1);
				if(!(_la===14 || _la===16)) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				}
				}
				this.state = 88;
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
		this.enterRule(localctx, 20, bookbox_parser.RULE_include_block);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 89;
			this.match(bookbox_parser.INCLUDE_OPEN);
			this.state = 90;
			this.match(bookbox_parser.INCLUDE_TEXT);
			this.state = 91;
			this.match(bookbox_parser.INCLUDE_CLOSE);
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

	public static readonly _serializedATN: number[] = [4,1,18,94,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,1,0,5,0,24,8,0,10,0,12,0,27,9,0,1,1,1,1,3,1,31,8,1,1,2,5,2,34,8,
	2,10,2,12,2,37,9,2,1,3,1,3,1,3,3,3,42,8,3,1,4,4,4,45,8,4,11,4,12,4,46,1,
	5,1,5,1,5,5,5,52,8,5,10,5,12,5,55,9,5,1,5,1,5,3,5,59,8,5,1,6,1,6,1,6,1,
	6,1,7,3,7,66,8,7,1,7,1,7,1,7,5,7,71,8,7,10,7,12,7,74,9,7,1,8,1,8,1,8,1,
	8,1,8,1,8,3,8,82,8,8,1,9,5,9,85,8,9,10,9,12,9,88,9,9,1,10,1,10,1,10,1,10,
	1,10,0,0,11,0,2,4,6,8,10,12,14,16,18,20,0,2,2,0,1,1,5,5,2,0,14,14,16,16,
	94,0,25,1,0,0,0,2,30,1,0,0,0,4,35,1,0,0,0,6,41,1,0,0,0,8,44,1,0,0,0,10,
	48,1,0,0,0,12,60,1,0,0,0,14,65,1,0,0,0,16,75,1,0,0,0,18,86,1,0,0,0,20,89,
	1,0,0,0,22,24,3,2,1,0,23,22,1,0,0,0,24,27,1,0,0,0,25,23,1,0,0,0,25,26,1,
	0,0,0,26,1,1,0,0,0,27,25,1,0,0,0,28,31,3,6,3,0,29,31,5,4,0,0,30,28,1,0,
	0,0,30,29,1,0,0,0,31,3,1,0,0,0,32,34,3,6,3,0,33,32,1,0,0,0,34,37,1,0,0,
	0,35,33,1,0,0,0,35,36,1,0,0,0,36,5,1,0,0,0,37,35,1,0,0,0,38,42,3,20,10,
	0,39,42,3,10,5,0,40,42,3,8,4,0,41,38,1,0,0,0,41,39,1,0,0,0,41,40,1,0,0,
	0,42,7,1,0,0,0,43,45,7,0,0,0,44,43,1,0,0,0,45,46,1,0,0,0,46,44,1,0,0,0,
	46,47,1,0,0,0,47,9,1,0,0,0,48,49,5,3,0,0,49,53,3,14,7,0,50,52,3,16,8,0,
	51,50,1,0,0,0,52,55,1,0,0,0,53,51,1,0,0,0,53,54,1,0,0,0,54,58,1,0,0,0,55,
	53,1,0,0,0,56,59,3,12,6,0,57,59,5,12,0,0,58,56,1,0,0,0,58,57,1,0,0,0,59,
	11,1,0,0,0,60,61,5,11,0,0,61,62,3,4,2,0,62,63,5,4,0,0,63,13,1,0,0,0,64,
	66,5,6,0,0,65,64,1,0,0,0,65,66,1,0,0,0,66,67,1,0,0,0,67,72,5,7,0,0,68,69,
	5,9,0,0,69,71,5,7,0,0,70,68,1,0,0,0,71,74,1,0,0,0,72,70,1,0,0,0,72,73,1,
	0,0,0,73,15,1,0,0,0,74,72,1,0,0,0,75,76,5,8,0,0,76,81,5,7,0,0,77,78,5,10,
	0,0,78,79,3,18,9,0,79,80,5,15,0,0,80,82,1,0,0,0,81,77,1,0,0,0,81,82,1,0,
	0,0,82,17,1,0,0,0,83,85,7,1,0,0,84,83,1,0,0,0,85,88,1,0,0,0,86,84,1,0,0,
	0,86,87,1,0,0,0,87,19,1,0,0,0,88,86,1,0,0,0,89,90,5,2,0,0,90,91,5,18,0,
	0,91,92,5,17,0,0,92,21,1,0,0,0,11,25,30,35,41,46,53,58,65,72,81,86];

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
	public tag_body(): Tag_bodyContext {
		return this.getTypedRuleContext(Tag_bodyContext, 0) as Tag_bodyContext;
	}
	public SELF_CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.SELF_CLOSE, 0);
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


export class Tag_bodyContext extends ParserRuleContext {
	constructor(parser?: bookbox_parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
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
    public get ruleIndex(): number {
    	return bookbox_parser.RULE_tag_body;
	}
	public enterRule(listener: bookbox_parserListener): void {
	    if(listener.enterTag_body) {
	 		listener.enterTag_body(this);
		}
	}
	public exitRule(listener: bookbox_parserListener): void {
	    if(listener.exitTag_body) {
	 		listener.exitTag_body(this);
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
	public COLON_list(): TerminalNode[] {
	    	return this.getTokens(bookbox_parser.COLON);
	}
	public COLON(i: number): TerminalNode {
		return this.getToken(bookbox_parser.COLON, i);
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
	public INCLUDE_OPEN(): TerminalNode {
		return this.getToken(bookbox_parser.INCLUDE_OPEN, 0);
	}
	public INCLUDE_TEXT(): TerminalNode {
		return this.getToken(bookbox_parser.INCLUDE_TEXT, 0);
	}
	public INCLUDE_CLOSE(): TerminalNode {
		return this.getToken(bookbox_parser.INCLUDE_CLOSE, 0);
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
