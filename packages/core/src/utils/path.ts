export function getByPath<T>(path: string[], obj: unknown): T | undefined {
    return path.reduce((elems, name) => elems[name] ?? {}, obj as any);
}
