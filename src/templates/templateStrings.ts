import { createGeneratorStrByTemplate } from 'architect-project';

// type from architect-project, need for rollup ↓
type ExtractTemplateKeys<
  S extends string,
  IS extends string,
  IE extends string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
> = S extends `${infer _Start}${IS}${infer Key}${IE}${infer Rest}` ? Key | ExtractTemplateKeys<Rest, IS, IE> : never;
type GenerateStringByTemplateParams<T extends string, IS extends string, IE extends string> = Record<
  ExtractTemplateKeys<T, IS, IE>,
  string
>;
// need for rollup ↑

export const genCode: <T extends string>(template: T, params: GenerateStringByTemplateParams<T, '~', '~'>) => string =
  createGeneratorStrByTemplate({ itrStart: '~', itrEnd: '~' });

const fn = `export const ~name~ = (~params~) => ~body~` as const;

export const templates = { fn };
