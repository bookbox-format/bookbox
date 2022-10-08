/**
 * Парсинг переносов строк (аля latex).
 *
 * Единичный перенос строк не учитывается.
 * Более двух переносов: начиная со второго каждый перенос засчитывается как новая строка
 * @param text исходный текст
 * @param newLine представление новой строки
 * @returns список текста и новых строк
 */
export function parseNewLines<T>(newLine: T): (text: string) => (T | string)[] {
    return (text) => {
        const result = [];
        const brs = text.match(/\n\n+/g);
        if (!brs) {
            return [text];
        }
        let tail = text;
        let i;
        for (const br of brs) {
            i = tail.indexOf(br);
            const subbrs = [];
            if (br.length === 2) {
                subbrs.push(newLine);
            } else {
                for (let j = 0; j < 2 * br.length - 4; j++) {
                    subbrs.push(newLine);
                }
            }
            result.push(tail.slice(0, i), ...subbrs);
            tail = tail.slice(i + br.length);
        }
        if (tail) {
            result.push(tail);
        }

        return result;
    };
}
