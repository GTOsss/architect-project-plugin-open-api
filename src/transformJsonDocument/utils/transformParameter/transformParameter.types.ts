import { OpenAPIV3 } from 'openapi-types';

/** OpenAPIV3.ParameterObject после преобразования методом `transformParameter()` */
export type ResolvedParameter = Omit<OpenAPIV3.ParameterObject, 'schema'> & {
  /**
   * Тип или название типа для кодогенерации. Получается в результате метода `transformSchema()`*/
  type: string;
};
