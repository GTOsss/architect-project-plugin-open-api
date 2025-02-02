import {
  isNull,
  isNotNull,
  isNotUndefined,
  isUndefined,
  isNotDefined,
  isDefined,
  isObject,
  isNotPrimitive,
  isHasFields,
  isHasNotFields,
} from './commonTypeGuards';

describe('commonTypeGuards', () => {
  describe('isNull', () => {
    it('Возвращает true для null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('Возвращает false для не-null значений', () => {
      expect(isNull('hello')).toBe(false);
      expect(isNull('')).toBe(false);
      expect(isNull(123)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull({})).toBe(false);
      expect(isNull([])).toBe(false);
      expect(isNull(undefined)).toBe(false);
      expect(isNull(true)).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull(() => {})).toBe(false);
    });
  });

  describe('isNotNull', () => {
    it('Возвращает true для не-null значений', () => {
      expect(isNotNull('hello')).toBe(true);
      expect(isNotNull('')).toBe(true);
      expect(isNotNull(123)).toBe(true);
      expect(isNotNull(0)).toBe(true);
      expect(isNotNull({})).toBe(true);
      expect(isNotNull([])).toBe(true);
      expect(isNotNull(undefined)).toBe(true);
      expect(isNotNull(true)).toBe(true);
      expect(isNotNull(false)).toBe(true);
      expect(isNull(() => {})).toBe(false);
    });

    it('Возвращает false для null', () => {
      expect(isNotNull(null)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('Возвращает true для undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
    });

    it('Возвращает false для не-undefined значений', () => {
      expect(isUndefined('hello')).toBe(false);
      expect(isUndefined('')).toBe(false);
      expect(isUndefined(123)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined({})).toBe(false);
      expect(isUndefined([])).toBe(false);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(true)).toBe(false);
      expect(isUndefined(false)).toBe(false);
      expect(isUndefined(() => {})).toBe(false);
    });
  });

  describe('isNotUndefined', () => {
    it('Возвращает true для не-undefined значений', () => {
      expect(isNotUndefined('hello')).toBe(true);
      expect(isNotUndefined('')).toBe(true);
      expect(isNotUndefined(123)).toBe(true);
      expect(isNotUndefined(0)).toBe(true);
      expect(isNotUndefined({})).toBe(true);
      expect(isNotUndefined([])).toBe(true);
      expect(isNotUndefined(null)).toBe(true);
      expect(isNotUndefined(true)).toBe(true);
      expect(isNotUndefined(false)).toBe(true);
      expect(isNotUndefined(() => {})).toBe(true);
    });

    it('Возвращает false для undefined', () => {
      expect(isNotUndefined(undefined)).toBe(false);
    });
  });

  describe('isDefined', () => {
    it('Возвращает true для не-null и не-undefined значений', () => {
      expect(isDefined('hello')).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(123)).toBe(true);
      expect(isDefined(0)).toBe(true);
      expect(isDefined({})).toBe(true);
      expect(isDefined([])).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined(true)).toBe(true);
      expect(isDefined(() => {})).toBe(true);
    });

    it('Возвращает false для null и undefined', () => {
      expect(isDefined(null)).toBe(false);
      expect(isDefined(undefined)).toBe(false);
    });
  });

  describe('isNotDefined', () => {
    it('Возвращает false для не-null и не-undefined значений', () => {
      expect(isNotDefined('hello')).toBe(false);
      expect(isNotDefined('')).toBe(false);
      expect(isNotDefined(123)).toBe(false);
      expect(isNotDefined(0)).toBe(false);
      expect(isNotDefined({})).toBe(false);
      expect(isNotDefined([])).toBe(false);
      expect(isNotDefined(true)).toBe(false);
      expect(isNotDefined(false)).toBe(false);
      expect(isNotDefined(() => {})).toBe(false);
    });

    it('Возвращает true для null и undefined', () => {
      expect(isNotDefined(null)).toBe(true);
      expect(isNotDefined(undefined)).toBe(true);
    });
  });

  describe('isObject', () => {
    it('Возвращает true только для объектов', () => {
      expect(isObject({})).toBe(true);
      expect(isObject(new Date())).toBe(true);
    });

    it('Возвращает false для не объектов', () => {
      expect(isObject('hello')).toBe(false);
      expect(isObject('')).toBe(false);
      expect(isObject(123)).toBe(false);
      expect(isObject(0)).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(true)).toBe(false);
      expect(isObject(false)).toBe(false);
      expect(isObject(() => {})).toBe(false);
      expect(isObject([])).toBe(false);
    });
  });

  describe('isNotPrimitive', () => {
    it('Возвращает true для объекта, функции или массива', () => {
      expect(isNotPrimitive({})).toBe(true);
      expect(isNotPrimitive([])).toBe(true);
      expect(isNotPrimitive(() => {})).toBe(true);
      expect(isNotPrimitive(new Date())).toBe(true);
    });

    it('Возвращает false для не примитивов', () => {
      expect(isNotPrimitive('hello')).toBe(false);
      expect(isNotPrimitive('')).toBe(false);
      expect(isNotPrimitive(0)).toBe(false);
      expect(isNotPrimitive(123)).toBe(false);
      expect(isNotPrimitive(undefined)).toBe(false);
      expect(isNotPrimitive(null)).toBe(false);
      expect(isNotPrimitive(true)).toBe(false);
      expect(isNotPrimitive(false)).toBe(false);
    });
  });

  describe('isHasFields', () => {
    it('Возвращает true при наличии указанных полей', () => {
      expect(isHasFields({ a: 1, b: 1 }, 'a')).toBe(true);
      expect(isHasFields({ a: 1, b: 1 }, 'a', 'b')).toBe(true);
    });

    it('Возвращает false отсутствии указанных полей', () => {
      expect(isHasFields({}, 'a')).toBe(false);
      expect(isHasFields({}, 'a', 'b')).toBe(false);
      expect(isHasFields({ a: 1 }, 'a', 'b')).toBe(false);
    });
  });

  describe('isHasNotFields', () => {
    it('Возвращает true при отсутствии всех указанных полей', () => {
      expect(isHasNotFields({}, 'a', 'b')).toBe(true);
      expect(isHasNotFields({ a: 1, b: 1 }, 'c')).toBe(true);
    });

    it('Возвращает false при наличии указанных полей', () => {
      expect(isHasNotFields({ a: 1 }, 'a')).toBe(false);
      expect(isHasNotFields({ a: 1, b: 1 }, 'a', 'b')).toBe(false);
      expect(isHasNotFields({ a: 1, b: 1 }, 'b')).toBe(false);
    });
  });
});
