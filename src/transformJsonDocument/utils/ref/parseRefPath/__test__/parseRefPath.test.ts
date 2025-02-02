import { parseRefPath } from '../parseRefPath';

describe('parseRefPath', () => {
  it('first/second', () => {
    expect(parseRefPath('first/second')).toEqual(['first', 'second']);
  });

  it('#/first/second', () => {
    expect(parseRefPath('#/first/second')).toEqual(['first', 'second']);
  });

  it('https://first/second', () => {
    expect(() => parseRefPath('https://first/second')).toThrowErrorMatchingSnapshot();
  });
});
