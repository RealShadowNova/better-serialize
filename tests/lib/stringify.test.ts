import { stringify } from '../../src';

describe('stringify', () => {
  test('GIVEN data THEN returns string', () => {
    const source = 'Hello World!';
    const expected = '{"t":1,"v":"Hello World!"}';

    expect(stringify(source)).toBe(expected);
  });
});
