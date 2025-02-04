import { urlGetterByPath } from '../urlGetterByPath';

describe('urlGetterByPath', () => {
  it('should create url getter function for /users', () => {
    expect(urlGetterByPath('/users')).toMatchSnapshot();
  });

  it('should create url getter function for /users/{userId}', () => {
    expect(urlGetterByPath('/users/{userId}')).toMatchSnapshot();
  });

  it('should create url getter function for /users/{userId}/groups/{groupId}', () => {
    expect(urlGetterByPath('/users/{userId}/groups/{groupId}')).toMatchSnapshot();
  });
});
