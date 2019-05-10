/**
 * TODO: (DEPRECATED) The functionality provided here is now incorporated into
 * `styleModifierPropTypes`. This should be removed before the v2 release.
 */

import isError from 'lodash.iserror';

import { validateResponsiveModifiers } from './styleModifierPropTypes';

/**
 * Evaluates the responsive modifiers prop against the size keys found in the reactive-container
 * package and the modifier config. Throws invalid proptype error if an incorrect size key is used
 * or a modifier is supplied in prop and not found in modifier config object.
 * @param  {Object} modifierConfig a modifier config object
 * @return {Function} Returns a prop validator function
 */
export default function responsiveStyleModifierPropTypes(modifierConfig) {
  return (props, propName, componentName) => {
    const responsiveModifiers = props[propName];

    const validModifiers = validateResponsiveModifiers(
      propName,
      componentName,
      responsiveModifiers,
      modifierConfig,
    );

    if (isError(validModifiers)) {
      return validModifiers;
    }

    return null;
  };
}
