import { AnyObject, isHasFields, isHasNotFields, isObject, isString } from '#/common/types/common';
import {
  OApiAllOfSchema,
  OApiAnyObjectSchema,
  OApiAnyOfSchema,
  OApiArraySchema,
  OApiEnumSchema,
  OApiObjectSchema,
  OApiOneOfSchema,
  OApiPrimitiveSchema,
} from './openapi.types';

const primitiveTypes = ['boolean', 'number', 'string', 'integer'];

export const isEnumSchema = (schema: AnyObject): schema is OApiEnumSchema => {
  return isHasFields(schema, 'type', 'enum');
};

export const isPrimitiveSchema = (schema: AnyObject): schema is OApiPrimitiveSchema => {
  return isHasFields(schema, 'type') && isHasNotFields(schema, 'enum') && primitiveTypes.includes(schema.type);
};

/**
 * true Если является схемой-объекта (OpenAPIV3.ObjectSchema)
 * */
export const isObjectSchema = (schema: AnyObject): schema is OApiObjectSchema => {
  return isHasFields(schema, 'type', 'properties') && schema.type === 'object';
};

export const isOneOfSchema = (schema: AnyObject): schema is OApiOneOfSchema => {
  return isHasFields(schema, 'oneOf');
};

export const isAnyOfSchema = (schema: AnyObject): schema is OApiAnyOfSchema => {
  return isHasFields(schema, 'anyOf');
};

export const isAllOfSchema = (schema: AnyObject): schema is OApiAllOfSchema => {
  return isHasFields(schema, 'allOf');
};

/**
 * true Если type указан как object, но отсутствует "properties"
 * */
export const isAnyObjectSchema = (schema: AnyObject): schema is OApiAnyObjectSchema => {
  return isHasFields(schema, 'type') && schema.type === 'object' && isHasNotFields(schema, 'properties');
};

/**
 * true Если является схемой-массива (OpenAPIV3.ArraySchemaObject)
 *
 * @example
 * // ...
 * //   responses:
 * //     '200':
 * //       description: List of users
 * //       content:
 * //         application/json:
 * //           schema: #### <<<<<<<<< ArraySchemaObject
 * //             type: array
 * //             items:
 * //               $ref: '#/components/schemas/User'
 * */
export const isArraySchema = (schema: AnyObject): schema is OApiArraySchema => {
  return isObject(schema) && 'type' in schema && isString(schema.type) && schema.type === 'array' && 'items' in schema;
};
