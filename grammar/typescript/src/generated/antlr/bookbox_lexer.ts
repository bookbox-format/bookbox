// Generated from bookbox_lexer.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
	ATN,
	ATNDeserializer,
	CharStream,
	DecisionState, DFA,
	Lexer,
	LexerATNSimulator,
	RuleContext,
	PredictionContextCache,
	Token
} from "antlr4";
export default class bookbox_lexer extends Lexer {
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
	public static readonly UNKNOWN = 12;
	public static readonly ATTR_ESC = 13;
	public static readonly ATTR_CLOSE = 14;
	public static readonly ATTR_TEXT = 15;
	public static readonly INCLUDE_CLOSE = 16;
	public static readonly INCLUDE_TEXT = 17;
	public static readonly EOF = Token.EOF;
	public static readonly BLOCK = 1;
	public static readonly ATTR = 2;
	public static readonly INCLUDE = 3;

	public static readonly channelNames: string[] = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            "'{{'", null, 
                                                            null, null, 
                                                            "'#'", null, 
                                                            "'.'", "':'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'}}'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "ESC", 
                                                             "INCLUDE_OPEN", 
                                                             "OPEN", "CLOSE", 
                                                             "TEXT", "SYSTEM_FLAG", 
                                                             "NAME", "DOT", 
                                                             "COLON", "ATTR_OPEN", 
                                                             "SEPARATOR", 
                                                             "UNKNOWN", 
                                                             "ATTR_ESC", 
                                                             "ATTR_CLOSE", 
                                                             "ATTR_TEXT", 
                                                             "INCLUDE_CLOSE", 
                                                             "INCLUDE_TEXT" ];
	public static readonly modeNames: string[] = [ "DEFAULT_MODE", "BLOCK", 
                                                "ATTR", "INCLUDE", ];

	public static readonly ruleNames: string[] = [
		"ESC", "INCLUDE_OPEN", "OPEN", "CLOSE", "TEXT", "SYSTEM_FLAG", "NAME", 
		"DOT", "COLON", "ATTR_OPEN", "SEPARATOR", "UNKNOWN", "ATTR_ESC", "ATTR_CLOSE", 
		"ATTR_TEXT", "INCLUDE_CLOSE", "INCLUDE_TEXT",
	];


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(this, bookbox_lexer._ATN, bookbox_lexer.DecisionsToDFA, new PredictionContextCache());
	}

	public get grammarFileName(): string { return "bookbox_lexer.g4"; }

	public get literalNames(): (string | null)[] { return bookbox_lexer.literalNames; }
	public get symbolicNames(): (string | null)[] { return bookbox_lexer.symbolicNames; }
	public get ruleNames(): string[] { return bookbox_lexer.ruleNames; }

	public get serializedATN(): number[] { return bookbox_lexer._serializedATN; }

	public get channelNames(): string[] { return bookbox_lexer.channelNames; }

	public get modeNames(): string[] { return bookbox_lexer.modeNames; }

	public static readonly _serializedATN: number[] = [4,0,17,93,6,-1,6,-1,
	6,-1,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,
	7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,
	7,15,2,16,7,16,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,3,1,3,
	1,4,1,4,1,5,1,5,1,6,4,6,58,8,6,11,6,12,6,59,1,7,1,7,1,8,1,8,1,9,1,9,1,9,
	1,9,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,1,12,1,12,1,12,1,13,1,13,1,
	13,1,13,1,14,1,14,1,15,1,15,1,15,1,15,1,15,1,16,1,16,0,0,17,4,1,6,2,8,3,
	10,4,12,5,14,6,16,7,18,8,20,9,22,10,24,11,26,12,28,13,30,14,32,15,34,16,
	36,17,4,0,1,2,3,2,1,0,97,122,3,0,9,10,13,13,32,32,90,0,4,1,0,0,0,0,6,1,
	0,0,0,0,8,1,0,0,0,0,10,1,0,0,0,0,12,1,0,0,0,1,14,1,0,0,0,1,16,1,0,0,0,1,
	18,1,0,0,0,1,20,1,0,0,0,1,22,1,0,0,0,1,24,1,0,0,0,1,26,1,0,0,0,2,28,1,0,
	0,0,2,30,1,0,0,0,2,32,1,0,0,0,3,34,1,0,0,0,3,36,1,0,0,0,4,38,1,0,0,0,6,
	41,1,0,0,0,8,46,1,0,0,0,10,50,1,0,0,0,12,52,1,0,0,0,14,54,1,0,0,0,16,57,
	1,0,0,0,18,61,1,0,0,0,20,63,1,0,0,0,22,65,1,0,0,0,24,69,1,0,0,0,26,73,1,
	0,0,0,28,77,1,0,0,0,30,80,1,0,0,0,32,84,1,0,0,0,34,86,1,0,0,0,36,91,1,0,
	0,0,38,39,5,92,0,0,39,40,9,0,0,0,40,5,1,0,0,0,41,42,5,123,0,0,42,43,5,123,
	0,0,43,44,1,0,0,0,44,45,6,1,0,0,45,7,1,0,0,0,46,47,5,123,0,0,47,48,1,0,
	0,0,48,49,6,2,1,0,49,9,1,0,0,0,50,51,5,125,0,0,51,11,1,0,0,0,52,53,9,0,
	0,0,53,13,1,0,0,0,54,55,5,35,0,0,55,15,1,0,0,0,56,58,7,0,0,0,57,56,1,0,
	0,0,58,59,1,0,0,0,59,57,1,0,0,0,59,60,1,0,0,0,60,17,1,0,0,0,61,62,5,46,
	0,0,62,19,1,0,0,0,63,64,5,58,0,0,64,21,1,0,0,0,65,66,5,123,0,0,66,67,1,
	0,0,0,67,68,6,9,2,0,68,23,1,0,0,0,69,70,7,1,0,0,70,71,1,0,0,0,71,72,6,10,
	3,0,72,25,1,0,0,0,73,74,9,0,0,0,74,75,1,0,0,0,75,76,6,11,3,0,76,27,1,0,
	0,0,77,78,5,92,0,0,78,79,9,0,0,0,79,29,1,0,0,0,80,81,5,125,0,0,81,82,1,
	0,0,0,82,83,6,13,3,0,83,31,1,0,0,0,84,85,9,0,0,0,85,33,1,0,0,0,86,87,5,
	125,0,0,87,88,5,125,0,0,88,89,1,0,0,0,89,90,6,15,4,0,90,35,1,0,0,0,91,92,
	9,0,0,0,92,37,1,0,0,0,5,0,1,2,3,59,5,2,3,0,5,1,0,5,2,0,4,0,0,2,0,0];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!bookbox_lexer.__ATN) {
			bookbox_lexer.__ATN = new ATNDeserializer().deserialize(bookbox_lexer._serializedATN);
		}

		return bookbox_lexer.__ATN;
	}


	static DecisionsToDFA = bookbox_lexer._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );
}