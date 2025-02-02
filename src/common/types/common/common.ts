/* eslint-disable @typescript-eslint/no-explicit-any */

export type ObjectKey = string | number | symbol;

export type Id = string | number;

/** ↓ Данные типы не безопасны, использовать только для infer ↓ */

export type AnyObject = Record<ObjectKey, any>;

export type AnyArray = any[];

export type AnyMethod = (...args: any[]) => any;

export type AnyAsyncMethod = (...args: any[]) => Promise<any>;

export type AnyObjectOrArray = AnyObject | AnyArray;

/** ↑ Данные типы не безопасны, использовать только для infer ↑ */
