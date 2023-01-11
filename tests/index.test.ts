import { packageName } from '../src';

describe('index', () => {
  test('GIVEN packageName THEN returns better-serialize', () => {
    expect(packageName).toBe('better-serialize');
  });
});
