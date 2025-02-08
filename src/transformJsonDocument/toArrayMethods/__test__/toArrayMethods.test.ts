import { testFor } from './utils';
import { OpenAPIV3 } from 'openapi-types';
import { readYaml } from '../../../__test__/utils/fs';
import { resolve } from 'path';
import HttpMethods = OpenAPIV3.HttpMethods;
import { toArrayMethods } from '../toArrayMethods';
import { TypesMap } from '../../types';

const openApiMock = readYaml(resolve(__dirname, '../../../mock/openapi.mock.yaml')) as OpenAPIV3.Document;
const openApiMockResponse200 = readYaml(
  resolve(__dirname, '../../../mock/cases/response200.yaml'),
) as OpenAPIV3.Document;
const openApiMockResponse200Extended = readYaml(
  resolve(__dirname, '../../../mock/cases/response200Extended.yaml'),
) as OpenAPIV3.Document;

const typesMap: TypesMap = {
  number: 'number',
  integer: 'number',
  string: 'string',
  boolean: 'boolean',
  anyObject: 'AnyObject', // если в scheme только type: object
  '*': 'any', // any если не удалось определить тип
};

const config = { typesMap };

describe('toArrayMethods mock/cases', () => {
  it('responseTypes: responses200.yaml', () => {
    const result = toArrayMethods(openApiMockResponse200, config);
    expect(result.map(({ responseType, path }) => ({ path, responseType }))).toMatchSnapshot();
  });

  it('responseTypes: response200Extended.yaml', () => {
    const result = toArrayMethods(openApiMockResponse200Extended, config);
    expect(result.map(({ responseType, path }) => ({ path, responseType }))).toMatchSnapshot();
  });
});

describe('toArrayMethods by openapi.mock.json', () => {
  it('GET /users', () => {
    expect(testFor(HttpMethods.GET, '/users', openApiMock)).toMatchSnapshot();
  });

  it('POST /users', () => {
    expect(testFor(HttpMethods.POST, '/users', openApiMock)).toMatchSnapshot();
  });

  it('PUT /users/{id}', () => {
    expect(testFor(HttpMethods.PUT, '/users/{id}', openApiMock)).toMatchSnapshot();
  });

  it('PATCH /users/{id}', () => {
    expect(testFor(HttpMethods.PATCH, '/users/{id}', openApiMock)).toMatchSnapshot();
  });

  it('DELETE /users/{id}', () => {
    expect(testFor(HttpMethods.DELETE, '/users/{id}', openApiMock)).toMatchSnapshot();
  });
});
