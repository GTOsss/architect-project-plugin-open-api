import { readYaml } from '../utils/fs';
import { resolve } from 'path';
import { OpenAPIV3 } from 'openapi-types';
import { toTypescriptFile } from './toFile';
import { applyEslint } from '../utils/code';

describe('Full stages (Open API spec to code file)', () => {
  it('toCodeFile', async () => {
    const code = toTypescriptFile();
    expect(await applyEslint(code)).toMatchSnapshot();
  });
});
