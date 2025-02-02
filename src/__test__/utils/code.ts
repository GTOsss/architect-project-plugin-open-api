import { existsSync } from 'fs';
import { ESLint } from 'eslint';

type ApplyEslintAutoFixParams = {
  code: string;
  eslintConfigPath: string;
  filePath: string;
};

/**
 * Apply autofix for input code
 * */
export const applyEslintAutofix = async ({
  code,
  eslintConfigPath,
  filePath,
}: ApplyEslintAutoFixParams): Promise<string> => {
  try {
    if (!existsSync(eslintConfigPath)) {
      throw new Error(`ESLint configuration file not found by path: ${eslintConfigPath}`);
    }

    const eslint = new ESLint({
      fix: true,
      overrideConfigFile: eslintConfigPath,
    });

    const results = await eslint.lintText(code, { filePath });

    await ESLint.outputFixes(results);

    return results[0]?.output || code;
  } catch (error) {
    console.error('Error applying eslint autofix:', error);
    return code;
  }
};

export const applyEslint = async (code: string) =>
  await applyEslintAutofix({ code, filePath: 'temp/forEslintAutofix.ts', eslintConfigPath: 'eslint.config.mjs' });
