import applyStyleModifiers from '../applyStyleModifiers';

const defaultModifierConfig = {
  test: () => ({ styles: 'display: relative;' }),
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

test('applyStyleModifiers returns the expect styles based on modifier prop', () => {
  const props = {
    modifiers: ['test', 'stringTest'],
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('display: relative; color: blue;');
});

test('applyStyleModifiers returns the expected styles when modifier interpolates from theme', () => {
  const props = {
    modifiers: ['themeTest'],
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toEqual('background-color: black;');
});
