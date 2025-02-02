import { OpenAPIV3 } from 'openapi-types';
import { toArrayMethods } from '../toArrayMethods';
import { Method } from '../toArrayMethods.types';
import { TypesMap } from '../../types';

const typesMap: TypesMap = {
  integer: 'number',
  number: 'number',
  string: 'string',
  boolean: 'boolean',
  anyObject: 'AnyObject', // если в scheme только type: object
  '*': 'any', // any если не удалось определить тип
};

/**
 * Находит объект указанного метода.
 * @example findMethod(HttpMethods.GET, 'users/{id}', methods);
 * */
export const findMethod = (method: OpenAPIV3.HttpMethods, path: string, methods: Method[]): Method => {
  return methods.find((currentMethod) => currentMethod.method === method && currentMethod.path === path);
};

/**
 * Вызывает getMethodsAsArray и находит в полученном массиве указанный метод.
 * */
export const testFor = (method: OpenAPIV3.HttpMethods, path: string, jsonDocument: OpenAPIV3.Document): Method => {
  const methods = toArrayMethods(jsonDocument, { typesMap });
  return findMethod(method, path, methods);
};
