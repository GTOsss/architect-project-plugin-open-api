import { OpenAPIV3 } from 'openapi-types';
import { Config } from '../types';
import { transformSchema } from '../utils/transformSchema';
import { GeneratedType } from './toArrayTypes.types';

/**
 * Подробное описание логики функции в ./README.md
 * */
export const toArrayTypes = (jsonDocument: OpenAPIV3.Document, config: Config): GeneratedType[] => {
  const schemas = jsonDocument.components.schemas;
  return Object.entries(schemas).reduce((acc, [schemaName, schemaData]) => {
    const typeValue = transformSchema(jsonDocument, schemaData, config);
    acc.push({ typeName: schemaName, typeValue });
    return acc;
  }, [] as GeneratedType[]);
};
