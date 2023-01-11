import { parse } from '../../src';

describe('parse', () => {
  test('GIVEN string THEN returns data', () => {
    const source = '{"t":1,"v":"Hello World!"}';
    const expected = 'Hello World!';

    expect(parse(source)).toBe(expected);
  });
});
