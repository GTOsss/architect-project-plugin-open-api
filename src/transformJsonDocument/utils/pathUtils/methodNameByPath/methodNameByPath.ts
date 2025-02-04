import { camelCase, upperFirst } from 'lodash';
import { isUrlParameter } from '../common';

/**
 * Функция для создания генерации имени метода на основе OpenAPI path
 *
 * @example
 * methodNameGen('/users') // 'getUsers'
 * methodNameGen('/users') // 'postUsers'
 * methodNameGen('/users/{id}') // 'getUsersById'
 * methodNameGen('/users/{userId}/groups/{groupId}') // 'getUsersByUserIdGroupsByGroupId'
 * */
export const methodNameByPath = (openApiPath: string) => {
  const locationSegments = openApiPath.split('/').filter(Boolean);
  const nameParts = locationSegments.map((segment, index) => {
    const isFirstSegment = index === 0;
    const isParameter = isUrlParameter(segment);
    const currentSegment = camelCase(isParameter ? segment.slice(1, -1) : segment);

    if (isParameter && isFirstSegment) {
      return 'by' + upperFirst(currentSegment);
    } else if (isParameter && !isFirstSegment) {
      return 'By' + upperFirst(currentSegment);
    } else if (!isParameter && isFirstSegment) {
      return currentSegment;
    } else if (!isParameter && !isFirstSegment) {
      return upperFirst(currentSegment);
    }
  });
  return nameParts.join('');
};
