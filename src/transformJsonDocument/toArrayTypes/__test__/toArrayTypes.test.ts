import { readYaml } from '../../../__test__/utils/fs';
import { resolve } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { toArrayTypes } from '../toArrayTypes';
import { TypesMap } from '../../types';
import { applyEslint } from '../../../__test__/utils/code';
import { createGeneratorStrByTemplate } from 'architect-project';
const genCode = createGeneratorStrByTemplate({ itrStart: '~', itrEnd: '~' });

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

describe('toArrayTypes mock/cases', () => {
  it('schemes in responses200.yaml', async () => {
    let code = toArrayTypes(openApiMockResponse200, config)
      .map(({ typeName, typeValue }) => genCode('export type ~typeName~ = ~typeValue~', { typeName, typeValue }))
      .join('\n');
    code = await applyEslint(code);

    expect(code).toMatchSnapshot();
  });

  it('schemes in responses200Extended.yaml', async () => {
    let code = toArrayTypes(openApiMockResponse200Extended, config)
      .map(({ typeName, typeValue }) => genCode('export type ~typeName~ = ~typeValue~', { typeName, typeValue }))
      .join('\n');
    code = await applyEslint(code);

    expect(code).toMatchSnapshot();
  });
});
