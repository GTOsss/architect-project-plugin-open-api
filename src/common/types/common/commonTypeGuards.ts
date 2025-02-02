/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyMethod, AnyObject, ObjectKey } from './common';
import { ArrayItemType } from '#/common/types/common/commonTypeUtils';

/** `=== null` */
export const isNull = (value: unknown): value is null => value === null;

/** `!== null` */
export const isNotNull = <T>(value: T): value is Exclude<T, null> => !isNull(value);

/** `=== undefined` */
export const isUndefined = (value: unknown): value is undefined => value === undefined;

/** `!== undefined` */
export const isNotUndefined = <T>(value: T): value is Exclude<T, undefined> => !isUndefined(value);

/** `!== null && !== undefined` */
export const isDefined = <T>(value: T): value is NonNullable<T> => isNotNull(value) && isNotUndefined(value);

/** === null || === undefined  */
export const isNotDefined = (value: unknown): value is null | undefined => !isDefined(value);

/** `!== null && typeof === 'object'`
 * - Функция основана на операторе typeof и Array.isArray(), по этому массив или функция не будет считаться объектом.
 * - Аргумент является вычисляемым типом, по этому возвращаемое значение будет соответствовать входящему,
 * но с исключением примитивов.
 * */
export const isObject = <T>(value: T): value is Exclude<T, number | string | boolean | null | undefined> & object =>
  isNotNull(value) && typeof value === 'object' && !Array.isArray(value);

/** `fieldA in obj && fieldB in obj && <...>`
 * True если объект имеет все указанные поля.
 * - Применяет оператор "in" для каждого переданного поля.
 * - Так же проверяет, является ли входящий аргумент объектом.
 *
 * @example
 * const obj: object = {};
 *
 * const result = isHasFields(obj, 'a', 'b', 'c')
 *   ? obj // ← сейчас тип obj: Record<'a' | 'b' | 'c', unknown>
 *   : null;
 * */
export const isHasFields = <Fields extends Array<ObjectKey>>(
  obj: AnyObject,
  ...fields: Fields
): obj is Record<ArrayItemType<Fields>, any> => {
  return isObject(obj) && fields.every((field) => field in obj);
};

/** `fieldA in obj && fieldB in obj && <...>`
 * True если в объекте отсутствуют все перечисленные поля.
 * - Применяет оператор "in" для каждого переданного поля.
 * - Так же проверяет, является ли входящий аргумент объектом.
 *
 * ```
 * // Сужать входящий тип исключив из него переданные ключи не удалось, по этому переданные поля заменяются на never:
 * // obj is O & {[K in Field]: never}
 * // Но это не дает достаточно удобного API, потому что ts все равно подсвечивает эти поля после проверки.
 * ```
 * */
export const isHasNotFields = <O extends AnyObject, Fields extends ObjectKey[]>(
  obj: O,
  ...fields: Fields
): obj is O & { [K in ArrayItemType<Fields>]: never } => {
  // ): obj is Omit<O, ArrayItemType<Fields>> => { // < не удалось заставить работать, хотя конструкция работает
  // если ее использовать для аргумента.
  return isObject(obj) && fields.every((field) => !(field in obj));
};

export const isNotObject = <T>(value: T): value is T => !isObject(value);

/** typeof value === 'string' */
export const isString = (value: any): value is string => typeof value === 'string';

/** True если является объектом, массивом, или функцией */
export const isNotPrimitive = <T>(value: T): value is Exclude<T, undefined | null | string | number | boolean> =>
  isObject(value) || Array.isArray(value) || typeof value === 'function';

export const isPrimitive = <T>(value: T): value is T => isNotPrimitive(value);

/** typeof value === 'boolean' */
export function isBoolean<Value>(value: Value | boolean): value is boolean {
  return typeof value === 'boolean';
}

export const isFunction = (value: any): value is AnyMethod => typeof value === 'function';
