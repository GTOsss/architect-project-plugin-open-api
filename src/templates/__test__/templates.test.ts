import { genCode, templates } from '../templateStrings';

describe('Templates', () => {
  it('fn', () => {
    const result = genCode(templates.fn, { name: 'fnName', params: 'fnParams', body: '"some result"' });
    expect(result).toMatchSnapshot();
  });
});
