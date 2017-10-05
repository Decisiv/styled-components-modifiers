import difference from 'lodash.difference';
import flatten from 'lodash.flatten';
import forIn from 'lodash.forin';
import isError from 'lodash.iserror';
import keys from 'lodash.keys';
import uniq from 'lodash.uniq';

function validateModifiers(
  propName,
  componentName,
  responsiveModifiers,
  modifierConfig,
) {
  const rawMissingModifiers = [];
  const rawSizesWithErrors = [];

  const modifierNames = keys(modifierConfig);
  forIn(responsiveModifiers, (v, k) => {
    const noMatches = difference(v, modifierNames);
    if (noMatches.length > 0) {
      rawMissingModifiers.push(noMatches);
      rawSizesWithErrors.push(k);
    }
  });

  const missingModifiers = uniq(flatten(rawMissingModifiers));
  const sizesWithErrors = uniq(rawSizesWithErrors);

  if (missingModifiers.length > 0) {
    const m = missingModifiers.length > 1 ? 'modifiers' : 'modifier';
    const modifierList = missingModifiers.join(', ');
    const k = sizesWithErrors.length > 1 ? 'keys' : 'key';
    const sizes = sizesWithErrors.join(', ');
    return new Error(
      `Invalid ${m} ${modifierList} used in prop '${propName}' (size ${k} ${sizes}) and supplied to ${componentName}. Validation failed.`,
    );
  }

  return null;
}

/**
 * Evaluates the responsive modifiers prop against the size keys found in the reactive-container
 * package and the modifier config. Throws invalid proptype error if an incorrect size key is used
 * or a modifier is supplied in prop and not found in modifier config object.
 * @param  {Object} modifierConfig a modifier config object
 * @return {null:Error}           Returns null or an error
 */
export default function responsiveStyleModifierPropTypes(modifierConfig) {
  return (props, propName, componentName) => {
    const responsiveModifiers = props[propName];

    const validModifiers = validateModifiers(
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
