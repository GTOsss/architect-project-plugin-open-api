export type ArrayElementType<A> = A extends Array<infer E> ? E : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionParams<FN> = FN extends (...params: infer P) => any ? P : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OmitFirstFromArray<T extends any[]> = T extends [any, ...infer R] ? R : never;
