import { toArrayTypes, toArrayMethods } from '#/transformJsonDocument';
import { readYaml } from '#/__test__/utils/fs';
import { resolve } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { TypesMap } from '#/transformJsonDocument/types';
import { genCode, requestAxiosTemplate } from '#/__test__/fullStages/templates';
import upperFirst from 'lodash.upperfirst';

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

export const toTypescriptFile = () => {
  const methods = toArrayMethods(openApiMock, config);

  return methods
    .map(({ method, parametersMap, responseType, requestBodyType }) => {
      return genCode(requestAxiosTemplate, {
        methodType: method,
        methodTypeUppercase: upperFirst(method),
        responseType,
        urlParams: 'urlparams',
        queryParams: 'queryparams',
        methodName: 'methodName',
        bodyType: requestBodyType,
        methodNameUppercase: 'MethodNameUppercase',
        urlGetter: 'urlgeeter',
      });
    })
    .join('\n ////////// \n');
};
