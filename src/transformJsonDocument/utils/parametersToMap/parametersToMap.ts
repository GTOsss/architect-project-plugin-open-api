import { OpenAPIV3 } from 'openapi-types';
import { transformParameter } from '../transformParameter';
import { ParameterInEnum, ParametersMap } from './parametersToMap.types';
import { Config } from '../../types';

type TransformParametersParams = {
  parameters: Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>;
  jsonDocument: OpenAPIV3.Document;
  config: Config;
};

/**
 * Собирает map-объект с возможными параметрами метода.
 *
 * Возвращает объект {@link ParametersMap}
 * @example
 * transformParameters({ parameters, jsonDocument }) // вернет:
 * // {
 * //   header: [ParameterObject, ...],
 * //   query: [ParameterObject, ...],
 * //   path: [ParameterObject, ...],
 * // }
 * const parametersMap = {
 *   header: [
 *     {
 *       in: 'header',
 *       name: 'Authorization',
 *       required: true,
 *       type: 'string', // готовый тип для кодогенерации
 *     },
 *   ],
 *   path: [],
 *   query: [
 *     {
 *       in: 'query',
 *       name: 'page',
 *       required: false,
 *       type: 'number', // готовый тип для кодогенерации
 *     },
 *     {
 *       in: 'query',
 *       name: 'role',
 *       type: "'admin' | 'user' | 'guest'", // готовый тип для кодогенерации
 *     },
 *   ],
 * };
 * */
export const parametersToMap = ({ parameters, jsonDocument, config }: TransformParametersParams) => {
  const initParametersMap: ParametersMap = {
    [ParameterInEnum.header]: [],
    [ParameterInEnum.path]: [],
    [ParameterInEnum.query]: [],
  };

  return parameters.reduce((acc, rawParameter) => {
    const parameter = transformParameter(jsonDocument, rawParameter, config);

    const currentIn: ParameterInEnum = parameter.in as ParameterInEnum;

    acc[currentIn].push(parameter);
    return acc;
  }, initParametersMap);
};
