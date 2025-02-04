import { isUrlParameter } from '../common';

/**
 * Возвращает массив параметров в OpenAPI path
 *
 * @example
 * urlGetterParams('/users/{userId}') // ['userId']
 * urlGetterParams('/users/{userId}/groups/{groupId}') // ['userId', 'groupId']
 * */
export const urlGetterParams = (openApiPath: string) => {
  const segments = openApiPath.split('/');
  return segments.filter((segment) => isUrlParameter(segment)).map((segment) => segment.slice(1, -1));
};
