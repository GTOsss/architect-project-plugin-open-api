import { AnyObject } from './common';

export type IsObject<V> = V extends AnyObject ? true : false;

export type NoUndef<T> = Exclude<T, undefined | null>;

export type PromiseValueType<V> = V extends Promise<infer Result> ? Result : 'PromiseValue received not Promise';

export type ArrayItemType<A> = A extends Array<infer T> ? T : never;
