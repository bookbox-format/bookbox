export function templateToList<T>(
    text: TemplateStringsArray,
    ...elements: T[]
): (T | string)[] {
    const result: (T | string)[] = [text[0]];
    for (let i = 1; i < text.length; i++) {
        result.push(elements[i - 1], text[i]);
    }
    return result;
}

export function isTemplateParams(
    args: any[]
): args is [TemplateStringsArray, ...any[]] {
    return (
        args[0] &&
        Array.isArray(args[0]) &&
        'raw' in args[0] &&
        Array.isArray(args[0]['raw'])
    );
}
