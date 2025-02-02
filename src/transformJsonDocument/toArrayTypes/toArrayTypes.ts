import { OpenAPIV3 } from 'openapi-types';
import { Config } from '../types';
import { transformSchema } from '../utils/transformSchema';
import { genCode } from '#/templates';

/**
 * Подробное описание логики функции в ./README.md
 * */
export const toArrayTypes = (jsonDocument: OpenAPIV3.Document, config: Config): string[] => {
  const schemas = jsonDocument.components.schemas;
  return Object.entries(schemas).reduce((acc, [schemaName, schemaData]) => {
    const typeValue = transformSchema(jsonDocument, schemaData, config);
    const schemaType = genCode('export type ~name~ = ~typeValue~', { name: schemaName, typeValue });
    acc.push(schemaType);
    return acc;
  }, [] as string[]);
};
