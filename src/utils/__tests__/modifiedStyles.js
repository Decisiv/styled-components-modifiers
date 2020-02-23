import { css } from 'styled-components';

import modifiedStyles from '../modifiedStyles';

const rebeccapurple = 'rebeccapurple';

const defaultModifierConfig = {
  styleString: () => 'color: blue;',
  themeTest: ({ theme }) => `background-color: ${theme.colors.text};`,
  cssUtilTest: () =>
    css`
      background-color: ${rebeccapurple};
    `,
};

const theme = {
  colors: {
    text: 'black',
  },
};

test('returns an empty string with no args', () => {
  expect(modifiedStyles()).toEqual('');
});

test('returns a string with styles when modifier given and config string supplied', () => {
  const styles = modifiedStyles(['styleString'], defaultModifierConfig, {
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

test('returns an empty string if modifierName is not in modifierConfig', () => {
  const styles = modifiedStyles(['notFound'], defaultModifierConfig, {
    theme,
  });
  expect(styles).toEqual('');
});

test('supports receiving the modifiers prop as a string', () => {
  const styles = modifiedStyles('themeTest', defaultModifierConfig, {
    theme,
  });
  expect(styles).toContain('background-color: black;');
});

test('filters out non String entries from the modifiers prop', () => {
  const styles = modifiedStyles(
    ['styleString', '', {}, [''], true, false, null, undefined],
    defaultModifierConfig,
    { theme },
  );
  expect(styles).toContain('color: blue;');
});

test('supports the css util from styled components', () => {
  const styles = modifiedStyles(['cssUtilTest'], defaultModifierConfig, {
    theme,
  });
  expect(styles).toContain('background-color: rebeccapurple;');
});
