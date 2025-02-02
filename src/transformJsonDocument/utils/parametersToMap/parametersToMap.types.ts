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
 * */
export type ParametersMap = Record<ParameterInEnum, ResolvedParameter[]>;
