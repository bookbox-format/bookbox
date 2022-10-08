/**
 * разбивает текст по границам пробельных символов
 */
export function getTextTokens(text: string): string[] {
    const notWords = text.match(/\s+/g);
    if (!notWords) {
        return [text];
    }
    const tokens: string[] = [];
    let tail = text;
    for (const notWord of notWords) {
        const i = tail.indexOf(notWord);
        tokens.push(tail.slice(0, i), notWord);
        tail = tail.slice(i + notWord.length);
    }
    if (tail) {
        tokens.push(tail);
    }
    return tokens;
}
