import { getNearDefineValue } from '../getNearDefineValue';
import { AnyObject } from '#/common/types/common';

const mockObj = {
  a: undefined,
  b: null,
  c: 0,
  d: '',
  e: 'some value',
};

describe('getNearDefineValue()', () => {
  it('Должна вернуть первое попавшееся не undefined значение', () => {
    expect(getNearDefineValue(mockObj, ['a', 'b', 'c', 'd', 'e'])).toEqual(0);
    expect(getNearDefineValue(mockObj as AnyObject, ['no1', 'no2', 'c'])).toEqual(0);
    expect(getNearDefineValue(mockObj as AnyObject, ['no1', 'no2', 'd'])).toEqual('');
    expect(getNearDefineValue(mockObj as AnyObject, ['e', 'd'])).toEqual('some value');
  });
});
