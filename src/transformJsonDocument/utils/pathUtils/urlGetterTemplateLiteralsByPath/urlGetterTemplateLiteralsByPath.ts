import { isUrlParameter } from '../common';

/**
 * Возвращает выражение конкатенации для построения url основанное на шаблонных литералах.
 * Используется для создания "url getter" функции.
 * @example
 * urlGetterTemplateLiterals('/users/{userId}') // возвращает строку: "`/users/${userId}`"
 * */
export const urlGetterTemplateLiteralsByPath = (openApiPath: string) => {
  const nodes = openApiPath.split('/').map((segment) => {
    if (isUrlParameter(segment)) {
      return `$${segment}`;
    } else {
      return segment;
    }
  });
  return `\`${nodes.join('/')}\``;
};
