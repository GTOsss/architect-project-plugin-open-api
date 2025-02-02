import { OpenAPIV3 } from 'openapi-types';
import { parseRefPath } from '../parseRefPath';

/**
 * Принимает ReferenceObject и вычисляет по нему имя схемы.
 * @example
 * getSchemaNameByRef({ $ref: '#/components/schemes/User' }) // User
 * */
export const getSchemaNameByRef = (referenceObject: OpenAPIV3.ReferenceObject): string => {
  return parseRefPath(referenceObject.$ref).pop();
};
