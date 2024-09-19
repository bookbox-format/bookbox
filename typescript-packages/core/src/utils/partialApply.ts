export function getPartialApply<
  T extends {[J in keyof T]: T[J]},
  K extends keyof T,
  R
>(
  f: (params: T) => R,
  args: { [J in K]: T[J] }
): (...params: keyof T extends K ? [] : [Omit<T, K>]) => R {
  return (...p: keyof T extends K ? [] : [Omit<T, K>]) =>
    f({ ...(p[0] ?? {}), ...args } as T);
}
