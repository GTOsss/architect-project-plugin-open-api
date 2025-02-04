import { urlGetterTemplateLiteralsByPath as urlGetter } from '../urlGetterTemplateLiteralsByPath';

describe('urlGetterTemplateLiteralsByPath', () => {
  it('should create template literal string by path', () => {
    expect(urlGetter('/users')).toEqual('`/users`');
    expect(urlGetter('/users/{userId}')).toEqual('`/users/${userId}`');
    expect(urlGetter('/users/{userId}/groups/{groupId}')).toEqual('`/users/${userId}/groups/${groupId}`');
  });
});
