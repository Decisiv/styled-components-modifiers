import { css } from 'styled-components';

import applyStyleModifiers from '../applyStyleModifiers';

const defaultModifierConfig = {
  themeTest: ({ theme }) =>
    css`
      background-color: ${theme.colors.text};
    `,
  stringTest: () => 'color: blue;',
};

const theme = {
  colors: {
    text: 'black',
  },
};

test('returns the expect styles based on modifier prop', () => {
  const props = {
    modifiers: ['stringTest', 'themeTest'],
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toMatch('color: blue;');
  expect(styles).toMatch('background-color: black;');
});

test('returns the expected styles when modifier interpolates from theme', () => {
  const props = {
    modifiers: 'themeTest',
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toMatch('background-color: black;');
});

test('returns a style string with styles based on size prop', () => {
  const props = {
    modifiers: {
      XS: ['stringTest'],
      SM: ['themeTest'],
    },
    size: 'SM',
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('background-color: black;');
  expect(styles).not.toContain('color: blue;');
});

test('returns default modifiers if size prop does not match', () => {
  const props = {
    modifiers: {
      _: ['stringTest'],
      XS: 'themeTest',
    },
    size: undefined,
    theme,
  };

  const styles = applyStyleModifiers(defaultModifierConfig)(props);

  expect(styles).toContain('color: blue;');
  expect(styles).not.toContain('background-color: black;');
});
