import keys from 'lodash.keys';

import normalizeModifiers from './utils/normalizeModifiers';

/**
 * Evaluates the modifiers prop against the modifier config. Throw invalid proptype if a
 * modifier is supplied in prop and not found in modifier config.
 * @param  {Object} modifierConfig a modifier config object
 * @return {Boolean:Error}               Returns true or an error
 */
export default function styleModifierPropTypes(modifierConfig) {
  return (props, propName, componentName) => {
    const modifierNames = keys(modifierConfig);
    const modifiers = normalizeModifiers(props[propName]);

    const firstInvalid = modifiers.find(name => !modifierNames.includes(name));

    if (firstInvalid) {
      return new Error(
        `Invalid modifier ${firstInvalid} used in prop ${propName} and supplied to ${componentName}. Validation failed.`,
      );
    }

    return undefined;
  };
}
