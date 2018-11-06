import PropTypes from 'prop-types';

import styleModifierPropTypes from '../styleModifierPropTypes';

const defaultModifierConfig = {
  test: () => ({ styles: 'display: relative;' }),
  defaultTest: () => ({ styles: 'color: blue;', defaultStyles: 'color: red;' }),
};

const noop = () => {};

test('styleModifierPropTypes does not log error if modifier array is not present', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const goodProps = {};
  PropTypes.checkPropTypes(testPropTypes, goodProps, 'prop', 'MyComponent');

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes does not log error with only valid modifiers', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const goodProps = { modifiers: 'defaultTest' };

  PropTypes.checkPropTypes(testPropTypes, goodProps, 'prop', 'MyComponent');

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes logs error to console with invalid modifier', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const badProps = { modifiers: ['invalidModifier', 'defaultTest'] };

  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain('Invalid modifier');

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});
