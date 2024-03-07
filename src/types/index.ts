
export type OverwriteFields<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V };