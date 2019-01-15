import applyStyleModifiers from '../applyStyleModifiers';
import withModifiers from "../withModifiers"

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

test('withModifiers returns the expect styles based on modifier prop', () => {
  const props = {
    modifiers: ['test', 'stringTest'],
    theme,
  };

  const styles = withModifiers(defaultModifierConfig)(modifier => modifier)(props);

  expect(styles).toEqual('display: relative; color: blue;');
});

test('withModifiers returns the expected styles when modifier interpolates from theme', () => {
  const props = {
    modifiers: ['themeTest'],
    theme,
  };

  const styles = withModifiers(defaultModifierConfig)(modifier => modifier)(props);

  expect(styles).toEqual('background-color: black;');
});
