import { OpenAPIV3 } from 'openapi-types';
import { resolveRef } from '../ref';
import { transformSchema } from '../transformSchema';
import { Config } from '../../types';
import { ResolvedParameter } from './transformParameter.types';

/**
 * 1. Если parameter является ссылкой, выдает значение ссылки.
 * 2. Преобразует в подходящий формат все вложенные поля
 *
 * См. "./jsonToObject.md" для информации о возможных форматах ссылки.
 * */
export const transformParameter = (
  jsonDocument: OpenAPIV3.Document,
  rawParameter: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject,
  config: Config,
): ResolvedParameter => {
  const { schema, ...resolvedParameter } = resolveRef(jsonDocument, rawParameter);
  const type = transformSchema(jsonDocument, schema, config);

  return { ...resolvedParameter, type };
};
