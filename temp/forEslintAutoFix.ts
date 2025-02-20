const axios: any = {};

type AnyObject = Record<string, any>;

// ########################### url getters ↓

export const getUrlPostUsers = () => `/users`;
export const getUrlGetUsers = () => `/users`;
export const getUrlPutUsersById = ({ id }: Record<string, string | number>) => `/users/${id}`;
export const getUrlPatchUsersById = ({ id }: Record<string, string | number>) => `/users/${id}`;
export const getUrlGetUsersById = ({ id }: Record<string, string | number>) => `/users/${id}`;
export const getUrlDeleteUsersById = ({ id }: Record<string, string | number>) => `/users/${id}`;
export const getUrlPostUsersBatch = () => `/users/batch`;
// ########################### types ↓

export type Error = { code: number; message: string };

export type Address = { street?: string; city?: string; country?: string; zipCode?: string };

export type User = {
  id: number;
  email: string;
  name?: string;
  role?: 'user_role' | 'admin_role' | 'guest_role';
  address?: Address;
  tags?: Array<string>;
  metadata?: AnyObject;
  birthDate?: string;
  createdAt?: string;
  score?: number;
  isActive?: boolean;
};

export type RefToUser = User;

// ########################### methods ↓

// ## POST /users ##

export type PostUsersParams = {
  body: { email: string; name?: string; role?: 'user' | 'guest' };
};

/**
 * POST /users
 * */
export const postUsers = ({ body }: PostUsersParams): User => {
  return axios.post(getUrlPostUsers(), body);
};

// ## GET /users ##

export type GetUsersParams = {
  queryParams: { page: number; role: 'admin' | 'user' | 'guest' };
};

/**
 * GET /users
 * */
export const getUsers = ({ queryParams }: GetUsersParams): Array<User> => {
  return axios.get(getUrlGetUsers(), null, { params: queryParams });
};

// ## PUT /users/{id} ##

export type PutUsersByIdParams = {
  urlParams: { id: number };
  body: User;
};

/**
 * PUT /users/{id}
 * */
export const putUsersById = ({ urlParams, body }: PutUsersByIdParams): User => {
  return axios.put(getUrlPutUsersById(urlParams), body);
};

// ## PATCH /users/{id} ##

export type PatchUsersByIdParams = {
  urlParams: { id: number };
  body: { name?: string; role?: 'admin' | 'user' | 'guest' };
};

/**
 * PATCH /users/{id}
 * */
export const patchUsersById = ({ urlParams, body }: PatchUsersByIdParams): User => {
  return axios.patch(getUrlPatchUsersById(urlParams), body);
};

// ## GET /users/{id} ##

export type GetUsersByIdParams = {
  urlParams: { id: number };
};

/**
 * GET /users/{id}
 * */
export const getUsersById = ({ urlParams }: GetUsersByIdParams): User => {
  return axios.get(getUrlGetUsersById(urlParams), null);
};

// ## DELETE /users/{id} ##

export type DeleteUsersByIdParams = {
  urlParams: { id: number };
};

/**
 * DELETE /users/{id}
 * */
export const deleteUsersById = ({ urlParams }: DeleteUsersByIdParams): undefined => {
  return axios.delete(getUrlDeleteUsersById(urlParams), null);
};

// ## POST /users/batch ##

export type PostUsersBatchParams = {
  body: Array<User>;
};

/**
 * POST /users/batch
 * */
export const postUsersBatch = ({ body }: PostUsersBatchParams): Array<User> => {
  return axios.post(getUrlPostUsersBatch(), body);
};
