import { AnyObject, isDefined } from '#/common/types/common';

/**
 * Возвращает первое попавшееся не undefined значение.
 * ```ts
 * const result = getBySomeKey(obj, ['a', 'b', 'c']);
 * // ↑ ↓ эквивалентный результат
 * const result = obj.a || obj.b || obj.c;
 * ```
 * */
export const getNearDefineValue = <O extends AnyObject, Keys extends Array<keyof O>>(responsesObj: O, keys: Keys) => {
  const currentReturnKey = keys.find((key) => isDefined(responsesObj[key]));
  return responsesObj[currentReturnKey];
};
