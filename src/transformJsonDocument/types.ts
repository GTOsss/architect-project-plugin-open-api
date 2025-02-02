/**
 * Все возможные значения поля OpenAPIV3.SchemaObject.type кроме array и object.
 * */
type OpenAPIPrimitiveType = 'boolean' | 'number' | 'string' | 'integer';

/**
 * Map-объект для трансформации типов в нужный формат.
 * @example:
 * const typesMap = {
 *     integer: 'number',
 *     string: 'string',
 *     boolean: 'boolean',
 *     anyObject: 'AnyObject', // если в scheme только type: object
 *     '*': 'any', // any если не удалось определить тип
 *   };
 * */
export type TypesMap = Record<OpenAPIPrimitiveType | 'anyObject' | '*', string>;

export type Config = {
  typesMap: TypesMap;
};
