/**
 * @example
 *
 * const pathSegments = ['users', '{userId}'] // 'users/{userId}'.split('/')
 * isUrlParameter(pathSegments[0]) // false for 'users'
 * isUrlParameter(pathSegments[1]) // true for '{userId}'
 *
 * */
export const isUrlParameter = (pathSegment: string) => pathSegment.startsWith('{') && pathSegment.endsWith('}');
