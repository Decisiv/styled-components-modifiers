import normalizeModifiers from '../normalizeModifiers';

test('returns an array with a modifier if passed a string', () => {
  expect(normalizeModifiers('foo')).toEqual(['foo']);
});

test('removes any non string elements from the modifiers array', () => {
  expect(
    normalizeModifiers([
      'foo',
      '',
      1,
      NaN,
      null,
      true,
      false,
      undefined,
      new Date(),
    ]),
  ).toEqual(['foo']);
});
