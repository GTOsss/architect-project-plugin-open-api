import { OpenAPIV3 } from 'openapi-types';
import { DataType } from '#/common/types/openApi';
import { transformSchema } from '../transformSchema';
import { resolveRef } from '../ref';
import { Config } from '../../types';
import { getNearDefineValue } from '../getNearDefineValue/getNearDefineValue';
import { isNotDefined } from '#/common/types/common';

/**
 * Предназначен для получение поля response в OpenAPI документе.
 *
 * Находит не undefined значение путем прохода по возможным статусам ответа (200, 201 и тд), затем по возможному типу ("application/json" и другие).
 * Более детальное описание поиска по полям:
 * - response status 200 || 201 || 202 || 203 || 204 || 'default'
 * - "application/json" || "multipart/form-data" || "application/x-www-form-urlencoded"
 * */
export const resolveResponseType = (
  jsonDocument: OpenAPIV3.Document,
  responsesObject: OpenAPIV3.ResponsesObject,
  config: Config,
) => {
  const currentResponseRaw = getNearDefineValue(responsesObject, [200, 201, 202, 203, 204, 'default']);
  const currentResponse = resolveRef(jsonDocument, currentResponseRaw);

  if (isNotDefined(currentResponse.content)) {
    return;
  }

  const content = getNearDefineValue(currentResponse.content, [
    DataType.json,
    DataType.formData,
    DataType.formUrlEncoded,
  ]);

  return transformSchema(jsonDocument, content.schema, config);
};
