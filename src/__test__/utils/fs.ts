import { parse } from 'yaml';
import { readFileSync } from 'fs-extra';

/**
 * Import yaml file as object
 * @example
 * readYaml(resolve(__dirname, '../../mock/openapi.mock.yaml'))
 * */
export const readYaml = (path: string) => {
  return parse(readFileSync(path, 'utf8'));
};
