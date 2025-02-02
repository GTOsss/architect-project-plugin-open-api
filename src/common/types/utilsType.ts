import { ReactNode } from 'react';

export type ArrayElementType<A> = A extends Array<infer E> ? E : never;

export type FunctionParams<FN> = FN extends (...params: infer P) => any ? P : never;

export type PropsTypeByComponent<FC> = FC extends (props: infer P) => ReactNode | null
  ? P
  : 'Не удалось вычислить тип пропсов компонента';

export type OmitFirstFromArray<T extends any[]> = T extends [any, ...infer R] ? R : never;
