import PropTypes from 'prop-types';

import styleModifierPropTypes from '../styleModifierPropTypes';

const defaultModifierConfig = {
  test: () => ({ styles: 'display: relative;' }),
  defaultTest: () => ({ styles: 'color: blue;', defaultStyles: 'color: red;' }),
  '1_per_row': () => ({
    styles: `
      width: 100%;
    `,
  }),
  '2_per_row': () => ({
    styles: `
      width: 50%;
    `,
  }),
  '3_per_row': () => ({
    styles: `
      width: 33.33%;
    `,
  }),
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
  const badProps = { modifiers: 'invalidModifier' };

  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifier invalidModifier used in prop 'modifiers' and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes logs error to console with invalid modifiers', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const badProps = { modifiers: ['invalidModifier', 'secondInvalidModifier'] };

  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifiers invalidModifier, secondInvalidModifier used in prop 'modifiers' and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes does not log error with valid modifiers when responsive', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const goodProps = {
    modifiers: {
      _: ['1_per_row'],
      SM: ['2_per_row', '3_per_row'],
    },
    size: 'SM',
  };
  PropTypes.checkPropTypes(testPropTypes, goodProps, 'prop', 'MyComponent');

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes logs error with invalid modifier key when responsive', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const badProps = {
    modifiers: {
      XS: ['1_per_row', 'test'],
      SM: 'wrongModifier',
    },
    size: 'SM',
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifier wrongModifier used in prop 'modifiers' (size key SM) and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes logs error with invalid modifier keys when responsive', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const badProps = {
    modifiers: {
      XS: ['1_per_row', 'firstWrongModifier'],
      SM: ['2_per_row', 'secondWrongModifier'],
    },
    size: 'SM',
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifiers firstWrongModifier, secondWrongModifier used in prop 'modifiers' (size keys XS, SM) and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('styleModifierPropTypes logs error when no size prop is passed when using responsive modifiers', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    modifiers: styleModifierPropTypes(defaultModifierConfig),
  };
  const badProps = {
    modifiers: {
      XS: ['1_per_row', 'test'],
      SM: '2_per_row',
    },
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    'Invalid Responsive Modifier; size prop must be included when using Responsive Modifiers.';
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});
