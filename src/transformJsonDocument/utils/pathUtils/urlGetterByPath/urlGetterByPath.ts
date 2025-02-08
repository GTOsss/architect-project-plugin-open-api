import { methodNameByPath } from '../methodNameByPath';
import { urlGetterTemplateLiteralsByPath } from '../urlGetterTemplateLiteralsByPath';
import { genCode } from '#/templates';
import { urlGetterParams } from '#/transformJsonDocument/utils/pathUtils/urlGetterParams';
import { upperFirst } from 'lodash';

/**
 * Генератор кода "url getter" функции.
 * */
export const urlGetterByPath = (openApiPath: string, method: string) => {
  let name = methodNameByPath(openApiPath);
  name = `${method}${upperFirst(name)}`;
  const body = urlGetterTemplateLiteralsByPath(openApiPath);
  let params = urlGetterParams(openApiPath).filter(Boolean).join();
  const typeParams = 'Record<string, string | number>';
  params = params ? `{ ${params} }: ${typeParams}` : '';
  return genCode(`~name~ = (~params~) => ~body~`, { name, params, body });
};
