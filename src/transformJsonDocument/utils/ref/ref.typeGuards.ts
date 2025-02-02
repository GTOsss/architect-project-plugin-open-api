import { OpenAPIV3 } from 'openapi-types';
import { isNotObject } from '#/common/types/common';

const REF_PROPERTY = '$ref' as const;

/**
 * true Если является объектом-ссылкой
 * Подробнее об OpenAPI ref описано в файле ./README.md
 *
 * @example
 * // В openAPI yaml выглядит так:
 * // ...
 * //   someValue:
 * //     $ref: '#/components/schemas/User'
 * */
export const isRefObject = <T>(data: OpenAPIV3.ReferenceObject | T): data is OpenAPIV3.ReferenceObject => {
  if (isNotObject(data)) {
    return false;
  }

  const dataAsRefObj = data as OpenAPIV3.ReferenceObject;

  return REF_PROPERTY in data && typeof dataAsRefObj[REF_PROPERTY] === 'string';
};
