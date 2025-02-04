import { methodNameByPath } from '../methodNameByPath';

describe('MethodNameGen', () => {
  it('should create method name by OpenAPI path', () => {
    expect(methodNameByPath('/users')).toEqual('users');
    expect(methodNameByPath('/users/{id}')).toEqual('usersById');
    expect(methodNameByPath('{groupId}/users/{id}')).toEqual('byGroupIdUsersById');
    expect(methodNameByPath('/users/{userId}/groups/{groupId}')).toEqual('usersByUserIdGroupsByGroupId');
  });
});
