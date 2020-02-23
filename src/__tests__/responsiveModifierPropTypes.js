import PropTypes from 'prop-types';

import responsiveStyleModifierPropTypes from '../responsiveStyleModifierPropTypes';

const defaultResponsiveModifierConfig = {
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

test('responsiveStyleModifierPropTypes does not log error with valid modifiers', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    responsiveModifiers: responsiveStyleModifierPropTypes(
      defaultResponsiveModifierConfig,
    ),
  };
  const goodProps = {
    responsiveModifiers: {
      XS: ['1_per_row'],
      SM: ['2_per_row', '3_per_row'],
    },
    size: 'SM',
  };
  PropTypes.checkPropTypes(testPropTypes, goodProps, 'prop', 'MyComponent');

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('responsiveStyleModifierPropTypes logs error with invalid modifier key', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    responsiveModifiers: responsiveStyleModifierPropTypes(
      defaultResponsiveModifierConfig,
    ),
  };
  const badProps = {
    responsiveModifiers: {
      XS: ['1_per_row', 'wrongModifier'],
      SM: ['2_per_row'],
    },
    size: 'XS',
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifier wrongModifier used in prop 'responsiveModifiers' (size key XS) and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('responsiveStyleModifierPropTypes logs error with invalid modifier keys', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    responsiveModifiers: responsiveStyleModifierPropTypes(
      defaultResponsiveModifierConfig,
    ),
  };
  const badProps = {
    responsiveModifiers: {
      XS: ['1_per_row', 'firstWrongModifier'],
      SM: ['2_per_row', 'secondWrongModifier'],
    },
    size: 'XS',
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Invalid modifiers firstWrongModifier, secondWrongModifier used in prop 'responsiveModifiers' (size keys XS, SM) and supplied to MyComponent. Validation failed.";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('responsiveStyleModifierPropTypes returns null if non responsiveModifiers are provided', () => {
  const nonResponsiveModifiers = {
    test: () => ({ styles: 'display: relative;' }),
    defaultTest: () => ({
      styles: 'color: blue;',
      defaultStyles: 'color: red;',
    }),
  };

  const result = responsiveStyleModifierPropTypes(
    defaultResponsiveModifierConfig,
  )(nonResponsiveModifiers, 'prop', 'MyComponent');

  expect(result).toEqual(null);
});

test('responsiveStyleModifierPropTypes logs error when no size prop is passed when using responsive modifiers', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    responsiveModifiers: responsiveStyleModifierPropTypes(
      defaultResponsiveModifierConfig,
    ),
  };
  const badProps = {
    responsiveModifiers: {
      XS: '1_per_row',
      SM: '2_per_row',
    },
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  const expectedErrMsg =
    "Warning: Failed prop type: Invalid responsive prop supplied to MyComponent. Prop 'size' must be included when using responsive modifiers. Validation failed";
  expect(consoleSpy).toHaveBeenCalled();
  const errorMsg = consoleSpy.mock.calls[0][0];
  expect(errorMsg).toContain(expectedErrMsg);

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});

test('responsiveStyleModifierPropTypes will pass if any size prop is declared', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(noop);

  const testPropTypes = {
    responsiveModifiers: responsiveStyleModifierPropTypes(
      defaultResponsiveModifierConfig,
    ),
  };
  const badProps = {
    responsiveModifiers: {
      XS: '1_per_row',
      SM: '2_per_row',
    },
    size: undefined,
  };
  PropTypes.checkPropTypes(testPropTypes, badProps, 'prop', 'MyComponent');

  expect(consoleSpy).not.toHaveBeenCalled();

  consoleSpy.mockReset();
  consoleSpy.mockRestore();
});
