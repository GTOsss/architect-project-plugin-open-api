const axios: any = {};

type AnyObject = Record<string, any>;

// ########################### url getters ↓

export const getUrlUsers = () => `/users`;
export const getUrlUsersById = ({ id }) => `/users/${id}`;
export const getUrlUsersBatch = () => `/users/batch`;
// ########################### types ↓

export type Error = { code: number; message: string };

export type Address = { street: string; city: string; country: string; zipCode: string };

export type User = {
  id: number;
  email: string;
  name: string;
  role: 'user_role' | 'admin_role' | 'guest_role';
  address: Address;
  tags: Array<string>;
  metadata: AnyObject;
  birthDate: string;
  createdAt: string;
  score: number;
  isActive: boolean;
};

export type RefToUser = User;

// ########################### methods ↓

// ## post /users ##

export type PostUsersParams = {
  body: { email: string; name: string; role: 'user' | 'guest' };
};

/**
 * post /users
 * */
export const postUsers = ({ body }: PostUsersParams): User => {
  return axios.post(getUrlUsers(), body);
};

// ## get /users ##

export type GetUsersParams = {
  queryParams: { page: number; role: 'admin' | 'user' | 'guest' };
};

/**
 * get /users
 * */
export const getUsers = ({ queryParams }: GetUsersParams): Array<User> => {
  return axios.get(getUrlUsers(), null, { params: queryParams });
};

// ## put /users/{id} ##

export type PutUsersByIdParams = {
  urlParams: { id: number };
  body: User;
};

/**
 * put /users/{id}
 * */
export const putUsersById = ({ urlParams, body }: PutUsersByIdParams): User => {
  return axios.put(getUrlUsersById(urlParams), body);
};

// ## patch /users/{id} ##

export type PatchUsersByIdParams = {
  urlParams: { id: number };
  body: { name: string; role: 'admin' | 'user' | 'guest' };
};

/**
 * patch /users/{id}
 * */
export const patchUsersById = ({ urlParams, body }: PatchUsersByIdParams): User => {
  return axios.patch(getUrlUsersById(urlParams), body);
};

// ## get /users/{id} ##

export type GetUsersByIdParams = {
  urlParams: { id: number };
};

/**
 * get /users/{id}
 * */
export const getUsersById = ({ urlParams }: GetUsersByIdParams): User => {
  return axios.get(getUrlUsersById(urlParams), null);
};

// ## delete /users/{id} ##

export type DeleteUsersByIdParams = {
  urlParams: { id: number };
};

/**
 * delete /users/{id}
 * */
export const deleteUsersById = ({ urlParams }: DeleteUsersByIdParams): undefined => {
  return axios.delete(getUrlUsersById(urlParams), null);
};

// ## post /users/batch ##

export type PostUsersBatchParams = {
  body: Array<User>;
};

/**
 * post /users/batch
 * */
export const postUsersBatch = ({ body }: PostUsersBatchParams): Array<User> => {
  return axios.post(getUrlUsersBatch(), body);
};
