import { toTypescriptFile } from './toFile';
import { applyEslint } from '../utils/code';
import { writeFileSync } from 'fs-extra';
import { resolve } from 'path';

describe('Full stages (Open API spec to code file)', () => {
  it('toCodeFile', async () => {
    const code = toTypescriptFile();
    const formattedCode = await applyEslint(code);
    const currentPath = resolve(__dirname, '__snapshots__', 'output.ts');
    writeFileSync(currentPath, formattedCode);
    expect(formattedCode).toMatchSnapshot();
  });
});
