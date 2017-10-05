import applyResponsiveStyleModifiers from '../applyResponsiveStyleModifiers';

const defaultModifierConfig = {
  test: () => ({ styles: 'display: relative;' }),
  themeTest: ({ theme }) => ({
    styles: `background-color: ${theme.colors.text};`,
  }),
  defaultTest: () => ({ styles: 'color: blue;', defaultStyles: 'color: red;' }),
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

test('returns only defaultStyles with no responsiveModifiers defined', () => {
  const props = {
    size: 'SM',
    theme,
  };

  const styles = applyResponsiveStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('color: red;');
});
