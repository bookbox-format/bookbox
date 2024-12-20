parser grammar bookbox_parser;

options {
	tokenVocab = bookbox_lexer;
}

file: file_block*;
file_block: block | CLOSE;
body: block*;
block: include_block | tag_block | text;

text: (TEXT | ESC)+;

tag_block: OPEN name (attr)* (tag_body | SELF_CLOSE);
tag_body: SEPARATOR body CLOSE;

name: SYSTEM_FLAG? NAME (COLON NAME)*;
attr: DOT NAME (ATTR_OPEN attr_text ATTR_CLOSE)?;
attr_text: (ATTR_TEXT | ATTR_ESC)*;

include_block: INCLUDE_OPEN INCLUDE_TEXT* INCLUDE_CLOSE;