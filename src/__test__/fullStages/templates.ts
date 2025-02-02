import { createGeneratorStrByTemplate } from 'architect-project';

export const genCode = createGeneratorStrByTemplate({ itrStart: '~', itrEnd: '~' });

export const requestAxiosTemplate = `
export type ~methodTypeUppercase~~methodNameUppercase~ = {
  urlParams: ~urlParams~,
  queryParams: ~queryParams~,
  body: ~bodyType~,
}

export const ~methodType~~methodName~ = ({
  urlParams,
  queryParams,
  body,
}: ~methodTypeUppercase~~methodNameUppercase~): ~responseType~ => {
  return axios.post(~urlGetter~, body)
}` as const;
