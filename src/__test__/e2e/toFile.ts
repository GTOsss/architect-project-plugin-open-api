import { toArrayTypes, toArrayMethods } from '#/transformJsonDocument';
import { readYaml } from '#/__test__/utils/fs';
import { resolve } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { TypesMap } from '#/transformJsonDocument/types';
import { genCode, requestAxiosTemplate } from '#/__test__/e2e/templates';
import { upperFirst, camelCase, toUpper } from 'lodash';
import { ParameterInEnum } from '#/transformJsonDocument/utils/parametersToMap/parametersToMap.types';

const openApiMock = readYaml(resolve(__dirname, '../../mock/openapi.mock.yaml')) as OpenAPIV3.Document;

const typesMap: TypesMap = {
  number: 'number',
  integer: 'number',
  string: 'string',
  boolean: 'boolean',
  anyObject: 'AnyObject', // если в scheme только type: object
  '*': 'any', // any если не удалось определить тип
};

const config = { typesMap };

const headerOfFile = `const axios: any = {};\n\ntype AnyObject = Record<string, any>\n`;

export const toTypescriptFile = () => {
  const typesCode = toArrayTypes(openApiMock, config).join('\n\n');

  const methods = toArrayMethods(openApiMock, config);
  const methodsCode = methods
    .map(({ method, parametersMap, responseType, requestBodyType, path, generatedMethodName }) => {
      /**
       * Хранит одно из двух:
       * - Список полей и типов в формате: 'userId: number, groupId: number'
       * Или
       * - пустую строку: ''
       * */
      const urlParamsTypes = parametersMap[ParameterInEnum.path]
        .map((urlParameter) => `${urlParameter.name}: ${urlParameter.type}`)
        .filter(Boolean)
        .join(',');

      /**
       * Хранит одно из двух:
       * - Список полей и типов в формате: 'userId: number, groupId: number'
       * Или
       * - пустую строку: ''
       * */
      const queryParamsTypes = parametersMap[ParameterInEnum.query]
        .map((queryParameter) => `${queryParameter.name}: ${queryParameter.type}`)
        .filter(Boolean)
        .join(',');

      const paramsType = [
        urlParamsTypes ? `urlParams: { ${urlParamsTypes} }` : '',
        queryParamsTypes ? `queryParams: { ${queryParamsTypes} }` : '',
        requestBodyType ? `body: ${requestBodyType}` : '',
      ]
        .filter(Boolean)
        .join();

      const paramsFields = [
        urlParamsTypes ? 'urlParams' : '',
        queryParamsTypes ? 'queryParams' : '',
        requestBodyType ? 'body' : '',
      ]
        .filter(Boolean)
        .join();

      const requestArguments = [
        `getUrl${upperFirst(generatedMethodName)}(${urlParamsTypes ? 'urlParams' : ''})`,
        requestBodyType ? 'body' : 'null',
        queryParamsTypes ? `{ params: queryParams }` : '',
      ]
        .filter(Boolean)
        .join();

      const methodParametersType = [upperFirst(method), upperFirst(camelCase(generatedMethodName)), 'Params'].join('');

      return genCode(requestAxiosTemplate, {
        method,
        methodCaps: toUpper(method),
        params: paramsFields,
        paramsType,
        path,
        methodParametersType,
        responseType,
        methodName: `${method}${upperFirst(generatedMethodName)}`,
        requestArguments,
      });
    })
    .join('\n\n');

  const urlGetters = Array.from(
    new Set(methods.map(({ urlGetter }) => `export const getUrl${upperFirst(urlGetter)}`)),
  ).join(';\n');

  return [
    headerOfFile,
    '// ########################### url getters ↓\n',
    urlGetters,
    '// ########################### types ↓\n',
    typesCode,
    '\n// ########################### methods ↓\n',
    methodsCode,
  ].join('\n');
};
