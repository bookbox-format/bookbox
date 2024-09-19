lexer grammar bookbox_lexer;

ESC: '\\' .;

DOUBLE_OPEN: '{{' -> mode(INCLUDE);
OPEN: '{' -> pushMode(BLOCK);
CLOSE: '}';
TEXT: .;

mode BLOCK;

SYSTEM_FLAG: '#';
NAME: [a-z]+;
DOT: '.';
ATTR_OPEN: '{' -> pushMode(ATTR);
SEPARATOR: [ \r\t\n] -> popMode;

// without parsing errors
UNKNOWN: . -> popMode;

mode ATTR;

ATTR_ESC: '\\' .;
ATTR_CLOSE: '}' -> popMode;
ATTR_TEXT: .;

mode INCLUDE;

DOUBLE_CLOSE: '}}' -> mode(DEFAULT_MODE);
INCLUDE_TEXT: .;