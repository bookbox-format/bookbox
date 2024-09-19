export function flatList(elems: any[]): any[] {
    const stack = [elems];
    const result = [];
    while (stack.length) {
        const current = stack.pop();
        if (Array.isArray(current)) {
            for (let i = current.length - 1; i >= 0; i--) {
                stack.push(current[i]);
            }
        } else {
            result.push(current);
        }
    }

    return result;
}