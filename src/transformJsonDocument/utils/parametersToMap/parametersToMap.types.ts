import { ResolvedParameter } from '../transformParameter/transformParameter.types';

/**
 * Возможные значения поля "in" у параметров.
 * @example
 * "parameters": [
 *   {
 *     "name": "id",
 *     "required": true,
 *     "in": "path", // <<< ParameterInEnum
 *     "schema": {
 *       "type": "number"
 *     }
 *   }
 * ],
 * */
export enum ParameterInEnum {
  'path' = 'path',
  'query' = 'query',
  'header' = 'header',
}

/**
 * @example
 * {
 *   header: [ParameterObject, ...],
 *   query: [ParameterObject, ...],
 *   path: [ParameterObject, ...],
 * }
 * @example
 * {
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
export type ParametersMap = Record<ParameterInEnum, ResolvedParameter[]>;
