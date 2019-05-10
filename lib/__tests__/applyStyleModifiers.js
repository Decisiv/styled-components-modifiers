import applyStyleModifiers from '../applyStyleModifiers';

const defaultModifierConfig = {
  test: () => ({
    styles: 'display: relative;',
  }),
  themeTest: ({ theme }) => ({
    styles: `background-color: ${theme.colors.text};`,
  }),
  stringTest: () => 'color: blue;',
};

const theme = {
  colors: {
    text: 'black',
  },
};

test('returns the expect styles based on modifier prop', () => {
  const props = {
    modifiers: ['test', 'stringTest'],
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('display: relative; color: blue;');
});

test('returns the expected styles when modifier interpolates from theme', () => {
  const props = {
    modifiers: 'themeTest',
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('background-color: black;');
});

test('returns a style string with styles based on size prop', () => {
  const props = {
    modifiers: {
      XS: ['test'],
      SM: ['themeTest'],
    },
    size: 'SM',
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('background-color: black;');
  expect(styles).not.toContain('display: relative;');
});

test('returns default modifiers if size prop does not match', () => {
  const props = {
    modifiers: {
      _: ['test'],
      XS: 'themeTest',
    },
    size: undefined,
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('display: relative;');
  expect(styles).not.toContain('background-color: black;');
});
