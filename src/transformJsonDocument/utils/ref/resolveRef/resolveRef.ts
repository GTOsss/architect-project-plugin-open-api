import { parseRefPath } from '../parseRefPath';
import { OpenAPIV3 } from 'openapi-types';
import get from 'lodash.get';
import { isRefObject } from '../ref.typeGuards';

/**
 * Если объект является ссылкой, вернет значение ссылки.
 * Не обрабатывает внутренние поля.
 * */
export const resolveRef = <T>(jsonDocument: OpenAPIV3.Document, value: T | OpenAPIV3.ReferenceObject): T => {
  if (isRefObject(value)) {
    const path = parseRefPath(value.$ref);
    return get(jsonDocument, path);
  }

  return value;
};
