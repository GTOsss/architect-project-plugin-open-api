import { createGeneratorStrByTemplate } from 'architect-project';

export const genCode = createGeneratorStrByTemplate({ itrStart: '~', itrEnd: '~' });

const fn = `export const ~name~ = (~params~) => ~body~` as const;

const inBrackets = `{ ~content~ }` as const;
const declarationType = `export type ~name~ = ~typeValue~` as const;

export const templates = { fn, inBrackets, declarationType };
