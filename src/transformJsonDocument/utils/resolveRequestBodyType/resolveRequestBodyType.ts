import { OpenAPIV3 } from 'openapi-types';
import { Config } from '#/transformJsonDocument/types';
import { resolveRef } from '#/transformJsonDocument/utils/ref';
import { isNotDefined } from '#/common/types/common';
import { getNearDefineValue } from '#/transformJsonDocument/utils/getNearDefineValue/getNearDefineValue';
import { DataType } from '#/common/types/openApi';
import { transformSchema } from '#/transformJsonDocument/utils/transformSchema';

/**
 * Предназначен для получения поля requestBody в OpenAPI документе.
 *
 * Находит не undefined значение путем прохода по возможным полям:
 * - "application/json" || "multipart/form-data" || "application/x-www-form-urlencoded"
 * */
export const resolveRequestBodyType = (
  jsonDocument: OpenAPIV3.Document,
  requestBody: OpenAPIV3.ReferenceObject | OpenAPIV3.RequestBodyObject,
  config: Config,
) => {
  const currentRequestBody = resolveRef(jsonDocument, requestBody);

  if (isNotDefined(currentRequestBody?.content)) {
    return;
  }

  const requestBodyContent = getNearDefineValue(currentRequestBody.content, [
    DataType.json,
    DataType.formData,
    DataType.formUrlEncoded,
  ]);

  return transformSchema(jsonDocument, requestBodyContent.schema, config);
};
