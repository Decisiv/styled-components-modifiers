import modifiedStyles from '../modifiedStyles';

const defaultModifierConfig = {
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

test('returns an empty string with no args', () => {
  expect(modifiedStyles()).toEqual('');
});

test('returns a string with defaultStyles when no modifiers given', () => {
  const styles = modifiedStyles([], defaultModifierConfig, { theme });
  expect(styles).toContain('color: red');
});

test('returns a string based on styles when modifier given', () => {
  const styles = modifiedStyles(['defaultTest'], defaultModifierConfig, {
    theme,
  });
  expect(styles).toContain('color: blue');
});

test('returns a string with values from theme', () => {
  const styles = modifiedStyles(['themeTest'], defaultModifierConfig, {
    theme,
  });
  expect(styles).toContain('background-color: black;');
});
