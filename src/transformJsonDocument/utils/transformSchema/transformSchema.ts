import { OpenAPIV3 } from 'openapi-types';
import {
  isAllOfSchema,
  isAnyObjectSchema,
  isAnyOfSchema,
  isArraySchema,
  isEnumSchema,
  isObjectSchema,
  isOneOfSchema,
  isPrimitiveSchema,
} from '../../openapi.typeGuards';
import { getSchemaNameByRef } from '../ref';
import { isRefObject } from '../ref/ref.typeGuards';
import { Config } from '../../types';
import {
  OApiAllOfSchema,
  OApiAnyOfSchema,
  OApiEnumSchema,
  OApiObjectSchema,
  OApiOneOfSchema,
  OApiPrimitiveSchema,
} from '../../openapi.types';

/**
 * Создает тип enum. OpenAPI не позволяет сделать именованные значения enum как в  typescript:
 * ```
 * enum Role { user: 'user_role', admin: 'admin_role' }
 * ```
 * По этому на основе OpenAPI schema описать enum в typescript можно только так:
 * ```
 *  "user_role" | "admin_role" | "guest_role"
 * ```
 * */
const createTypeEnum = (schema: OApiEnumSchema) => {
  return schema.enum.map((el) => `"${el}"`).join(' | ');
};

/**
 * Создает тип примитивов.
 * */
const createTypePrimitive = (schema: OApiPrimitiveSchema, config: Config) => {
  return config.typesMap[schema.type];
};

/**
 * Создает тип объекта в котором отсутствует свойство "properties".
 * */
const createTypeAnyObject = (config: Config) => {
  return config.typesMap.anyObject;
};

/**
 * Создает тип объекта. Пример схемы объекта в OpenAPI yaml который принимает функция в формате json объекта:
 * ```yaml
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *         city:
 *           type: string
 *         country:
 *           type: string
 *         zipCode:
 *           type: string
 * ```
 *
 * Пример возвращаемого значения:
 * ```ts
 * "{ name: string, address: Address, obj: { a: string } }"
 * ```
 *
 * */
const createTypeObject = (jsonDocument: OpenAPIV3.Document, schema: OApiObjectSchema, config: Config): string => {
  /**
   * Будет хранить мап-объект с полями которые обязательны, если такого поля нет в объекте, оно не обязательно.
   * @example
   * const requiredMap = {
   *   name: true,
   * }
   * */
  const requiredMap = (schema.required || []).reduce(
    (acc, field) => {
      acc[field] = true;
      return acc;
    },
    {} as Record<string, boolean>,
  );

  /**
   * Будет хранить массив строк в формате "поле: значение"
   * @example
   * ["fieldA: number", "fieldB: User", "fieldObj: { a: string }" ]
   * */
  const typeFields = Object.entries(schema.properties).reduce((acc, [fieldName, fieldSchema]) => {
    const fieldType = transformSchema(jsonDocument, fieldSchema, config);
    const isRequired = requiredMap[fieldName];
    const optionalFlag = isRequired ? '' : '?';
    acc.push(`${fieldName}${optionalFlag}: ${fieldType}`);
    return acc;
  }, [] as string[]);

  /**
   * @example
   * "fieldA: number, fieldB: User, fieldObj: { a: string }"
   */
  const fieldsAndTypes = typeFields.join();

  return `{ ${fieldsAndTypes} }`;
};

/**
 * Создает тип массива. Пример массив-схемы в OpenAPI yaml:
 * ```yaml
 * # ...
 *    responses:
 *      '200':
 *        description: List of users
 *        content:
 *          application/json:
 *            # В данном случае createTypeArray() вернет Array<User>:
 *            schema: # <<< схема которая приходит аргументом createTypeArray(_, schema, _)
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 * ```
 * */
const createTypeArray = (
  jsonDocument: OpenAPIV3.Document,
  schema: OpenAPIV3.ArraySchemaObject,
  config: Config,
): string => {
  return `Array<${transformSchema(jsonDocument, schema.items, config)}>`;
};

const createTypeOneOf = (jsonDocument: OpenAPIV3.Document, schema: OApiOneOfSchema, config: Config) => {
  const types = schema.oneOf.map((schema) => transformSchema(jsonDocument, schema, config));
  return types.join(' | ');
};

const createTypeAnyOf = (jsonDocument: OpenAPIV3.Document, schema: OApiAnyOfSchema, config: Config) => {
  const types = schema.anyOf.map((schema) => transformSchema(jsonDocument, schema, config));
  return types.join(' | ');
};

const createTypeAllOf = (jsonDocument: OpenAPIV3.Document, schema: OApiAllOfSchema, config: Config) => {
  const types = schema.allOf.map((schema) => transformSchema(jsonDocument, schema, config));
  return types.join(' & ');
};

const createAnyType = (config: Config) => {
  return config.typesMap['*'];
};

/**
 * Принимает возможное значение схемы и возвращает подходящее для кодогенерации значение.
 * Логика по условиям
 * - Если пришла ссылка на схему, вернет название схемы: "User"
 * - Если пришла схема описывающая примитивный тип, вернет тип сопоставленный через config.typeMap: "number"
 * - Если пришла схема-массив обернет значение массива в "Array<>": "Array<User>"
 * - Если пришла схема-enum: "'user' | 'admin'"
 * - Если пришла схема объекта, вернет перечисление "поле: тип" через запятую: "fieldA: number, fieldB: User, fieldObj: { a: string }"
 * - Если пришла схема объекта без "properties", выставит значение config.typesMap.anyObject: "AnyObject"
 * - <todo другие кейсы (oneOf, anyOf, allOf, not)>
 * */
export const transformSchema = (
  jsonDocument: OpenAPIV3.Document,
  schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject,
  config: Config,
): string => {
  if (isRefObject(schema)) {
    return getSchemaNameByRef(schema); // "User"
  } else if (isPrimitiveSchema(schema)) {
    return createTypePrimitive(schema, config); // "string"
  } else if (isObjectSchema(schema)) {
    return createTypeObject(jsonDocument, schema, config); // "{ name: string, address: Address, obj: { a: string } }"
  } else if (isAnyObjectSchema(schema)) {
    return createTypeAnyObject(config); // "AnyObject"
  } else if (isArraySchema(schema)) {
    return createTypeArray(jsonDocument, schema, config); // Array<User>
  } else if (isEnumSchema(schema)) {
    return createTypeEnum(schema); // "'user_role' | 'admin_role'"
  } else if (isOneOfSchema(schema)) {
    return createTypeOneOf(jsonDocument, schema, config); // "string | number | User"
  } else if (isAnyOfSchema(schema)) {
    return createTypeAnyOf(jsonDocument, schema, config); // "string | number | User"
  } else if (isAllOfSchema(schema)) {
    return createTypeAllOf(jsonDocument, schema, config); // "User & UserDetailed"
  }

  return createAnyType(config); // any
};
