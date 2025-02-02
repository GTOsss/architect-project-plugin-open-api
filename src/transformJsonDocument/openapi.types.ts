import { OpenAPIV3 } from 'openapi-types';

export type OApiPrimitiveSchema = Omit<OpenAPIV3.BaseSchemaObject, 'type' | 'enum'> & {
  type: 'boolean' | 'number' | 'string' | 'integer';
};

export type OApiObjectSchema = Omit<OpenAPIV3.NonArraySchemaObject, 'type' | 'enum'> & {
  type: 'object';
};

export type OApiAnyObjectSchema = Omit<OpenAPIV3.NonArraySchemaObject, 'type' | 'enum' | 'properties'> & {
  type: 'object';
};

export type OApiArraySchema = Omit<OpenAPIV3.ArraySchemaObject, 'type' | 'enum'> & {
  type: 'array';
};

export type OApiEnumSchema = OpenAPIV3.BaseSchemaObject;
