import applyResponsiveStyleModifiers from '../applyResponsiveStyleModifiers';

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

test('returns a style string with styles based on size prop', () => {
  const props = {
    responsiveModifiers: {
      XS: ['test'],
      SM: ['themeTest'],
    },
    size: 'SM',
    theme,
  };

  const styles = applyResponsiveStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('background-color: black;');
  expect(styles).not.toContain('display: relative;');
});

test('returns a style string with styles based on size prop and config styles is a string', () => {
  const props = {
    responsiveModifiers: {
      XS: 'stringTest',
      SM: ['themeTest'],
    },
    size: 'XS',
    theme,
  };

  const styles = applyResponsiveStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('color: blue;');
});

test('returns default modifiers if size prop does not match', () => {
  const props = {
    responsiveModifiers: {
      _: ['test'],
      XS: 'themeTest',
    },
    size: undefined,
    theme,
  };

  const styles = applyResponsiveStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('display: relative;');
  expect(styles).not.toContain('background-color: black;');
});

test('returns null when non responsive modifiers are provided', () => {
  const props = {
    responsiveModifiers: 'badModifiers',
    size: 'XS',
    theme,
  };

  expect(applyResponsiveStyleModifiers(defaultModifierConfig)(props)).toEqual(
    null,
  );
});
