import curry from 'lodash.curry';
import keys from 'lodash.keys';
import PropTypes from 'prop-types';

const validateModifiers = curry(
  (modifierConfig, propValue, idx, componentName, location, propFullName) => {
    const modifierName = propValue[idx];
    const modifierNames = keys(modifierConfig);
    const match = modifierNames.includes(modifierName);
    if (!match) {
      return new Error(
        `Invalid modifier ${modifierName} used in prop ${propFullName} and supplied to ${componentName}. Validation failed.`,
      );
    }
    return true;
  },
);

/**
 * Evaluates the modifiers prop against the modifier config. Throw invalid proptype if a
 * modifier is supplied in prop and not found in modifier config.
 * @param  {Object} modifierConfig a modifier config object
 * @return {Boolean:Error}               Returns true or an error
 */
export default function styleModifierPropTypes(modifierConfig) {
  return PropTypes.arrayOf(validateModifiers(modifierConfig));
}
