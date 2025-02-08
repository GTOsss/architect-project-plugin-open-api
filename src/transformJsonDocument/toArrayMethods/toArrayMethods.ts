import { OpenAPIV3 } from 'openapi-types';
import { isNotDefined } from '#/common/types/common';
import { parametersToMap } from '../utils/parametersToMap';
import { Method } from './toArrayMethods.types';
import { resolveResponseType } from '../utils/resolveResponseType';
import { Config } from '../types';
import { resolveRequestBodyType } from '#/transformJsonDocument/utils/resolveRequestBodyType';
import { methodNameByPath } from '#/transformJsonDocument/utils/pathUtils/methodNameByPath/methodNameByPath';
import { urlGetterByPath } from '#/transformJsonDocument/utils/pathUtils/urlGetterByPath/urlGetterByPath';

/**
 * Для обхода Open API методов.
 * ```yaml
 * paths: # мап-объект
 *   /products: # мап-объект
 *     get: # <<<
 *         # ...
 *     post: # <<<
 *         # ...
 * ```
 * */
const httpMethodsArray = [
  OpenAPIV3.HttpMethods.POST,
  OpenAPIV3.HttpMethods.PUT,
  OpenAPIV3.HttpMethods.PATCH,
  OpenAPIV3.HttpMethods.GET,
  OpenAPIV3.HttpMethods.DELETE,
];

/**
 * 1. Преобразует оригинальный JSON документ open API в массив объектов, где каждый элемент массива это конкретный
 * ендпоинт.
 * 2. Резолвит все $ref объекты
 *
 * Подробное описание логики функции в ./README.md
 *
 * */
export const toArrayMethods = (jsonDocument: OpenAPIV3.Document, config: Config) => {
  // Проход по всем paths
  const methods = Object.entries(jsonDocument.paths).reduce((acc, [path, pathData]) => {
    const pathDataParameters = pathData.parameters || [];

    // Проход по HTTP Methods: "POST users" > "PUT users" > "PATCH users" > "GET users" > ...
    httpMethodsArray.forEach((method) => {
      const currentMethodData = pathData[method];

      if (isNotDefined(currentMethodData)) {
        return;
      }

      const { description, summary, tags, parameters } = currentMethodData;
      const methodDataParameter = parameters || [];

      // Взять параметры текущего метода (GET /users) и общие параметры от текущего path (/users)
      const allParameters = [...methodDataParameter, ...pathDataParameters];

      // Хранит map объект полученный проходом по массиву параметров конкретного REST API.
      const parametersMap = parametersToMap({ parameters: allParameters, jsonDocument, config });

      /**
       * Хранит сгенерированный тип схемы успешного статуса.
       * Поиск ближайшего не пустого значения в OpenAPI документе происходит по следующем полям:
       * - 200 || 201 || ... || default
       * - "application/json" || "multipart/form-data" || "application/x-www-form-urlencoded"
       * */
      const responseType = resolveResponseType(jsonDocument, currentMethodData.responses, config);

      /**
       * Хранит сгенерированный тип схемы поля requestBody
       * */
      const requestBodyType = resolveRequestBodyType(jsonDocument, currentMethodData.requestBody, config);

      const generatedMethodName = methodNameByPath(path);

      const urlGetter = urlGetterByPath(path, method);

      acc.push({
        generatedMethodName,
        path,
        method,
        description,
        summary,
        tags,
        parametersMap,
        responseType,
        requestBodyType,
        urlGetter,
      });
    });

    return acc;
  }, [] as Method[]);

  return methods;
};
