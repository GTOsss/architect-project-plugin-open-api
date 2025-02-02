import { isString } from '#/common/types/common';

/**
 * Превращает $ref строку в массив.
 * См. "./jsonToObject.md" для информации о возможных форматах ссылки.
 * @example
 * parseRefPath('first/second') // → ['first', 'second']
 * parseRefPath('#/first/second') // → ['first', 'second'] */
export const parseRefPath = (ref: string) => {
  if (isString(ref)) {
    const segments = ref.split('/');
    const firstSegment = segments[0];

    if (firstSegment === '#') {
      // ↓ Ссылка на текущий jsonDocument: "#/some/path" ↓

      return segments.slice(1);
    } else if (['http:', 'https:'].includes(firstSegment)) {
      // ↓ Ссылка http/https: "http://some/path" ↓

      throw new Error(`$ref as HTTP/HTTPS url currently not supported: ${ref}`);
    } else {
      // ↓ Обычная ссылка: "some/path" ↓

      return segments;
    }
  } else {
    throw new Error('Invalid ref format. Ref values must be an string');
  }
};
