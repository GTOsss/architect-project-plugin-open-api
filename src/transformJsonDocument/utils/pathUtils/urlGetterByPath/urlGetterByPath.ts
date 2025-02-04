import { methodNameByPath } from '../methodNameByPath';
import { urlGetterTemplateLiteralsByPath } from '../urlGetterTemplateLiteralsByPath';
import { genCode } from '#/templates';
import { urlGetterParams } from '#/transformJsonDocument/utils/pathUtils/urlGetterParams';

/**
 * Генератор кода "url getter" функции.
 * */
export const urlGetterByPath = (openApiPath: string) => {
  const name = methodNameByPath(openApiPath);
  const body = urlGetterTemplateLiteralsByPath(openApiPath);
  let params = urlGetterParams(openApiPath).filter(Boolean).join();
  params = params ? `{ ${params} }` : '';
  return genCode(`~name~ = (~params~) => ~body~`, { name, params, body });
};
