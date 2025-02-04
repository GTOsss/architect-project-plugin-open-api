Пример кода для одного запроса который должен генерироваться.
```ts
// ## PUT /users/{id} ##
export type PutMethodNameUppercase = {
  urlParams: { id: string };
  queryParams: { count: number };
  body: User;
};

/**
 * PUT /users/{id}
 * */
export const putmethodName = ({ urlParams, queryParams, body }: PutMethodNameUppercase): User => {
  return axios.post(urlgeeter, body, { params: queryParams });
};
```