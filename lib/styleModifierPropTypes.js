import difference from 'lodash.difference';
import flatten from 'lodash.flatten';
import forIn from 'lodash.forin';
import isArray from 'lodash.isarray';
import isError from 'lodash.iserror';
import isObject from 'lodash.isobject';
import keys from 'lodash.keys';
import uniq from 'lodash.uniq';

import normalizeModifiers from './utils/normalizeModifiers';

function generateError(
  propName,
  componentName,
  missingModifiers,
  sizesWithErrors,
) {
  const m = missingModifiers.length > 1 ? 'modifiers' : 'modifier';
  const modifierList = missingModifiers.join(', ');
  const k = sizesWithErrors && sizesWithErrors.length > 1 ? 'keys' : 'key';

  return new Error(
    `Invalid ${m} ${modifierList} used in prop '${propName}'${
      sizesWithErrors ? ` (size ${k} ${sizesWithErrors.join(', ')})` : ''
    } and supplied to ${componentName}. Validation failed.`,
  );
}

function getMissingModifiers(modifiers, modifierConfig) {
  return difference(normalizeModifiers(modifiers), keys(modifierConfig));
}

function validateModifiers(propName, componentName, modifiers, modifierConfig) {
  const missingModifiers = getMissingModifiers(modifiers, modifierConfig);

  if (missingModifiers.length > 0) {
    return generateError(propName, componentName, missingModifiers);
  }

  return null;
}

export function validateResponsiveModifiers(
  propName,
  componentName,
  responsiveModifiers,
  modifierConfig,
) {
  const rawMissingModifiers = [];
  const rawSizesWithErrors = [];

  forIn(responsiveModifiers, (modifiers, size) => {
    const missingModifiers = getMissingModifiers(modifiers, modifierConfig);
    if (missingModifiers.length > 0) {
      rawMissingModifiers.push(missingModifiers);
      rawSizesWithErrors.push(size);
    }
  });

  const missingModifiers = uniq(flatten(rawMissingModifiers));
  const sizesWithErrors = uniq(rawSizesWithErrors);

  if (missingModifiers.length > 0) {
    return generateError(
      propName,
      componentName,
      missingModifiers,
      sizesWithErrors,
    );
  }

  return null;
}

/**
 * Evaluates the modifiers prop against the modifier config. Throws invalid proptype error
 * if a modifier is supplied in prop and not found in modifier config.
 * @param  {Object} modifierConfig a modifier config object
 * @return {Function} Returns a prop validator function
 */
export default function styleModifierPropTypes(modifierConfig) {
  return (props, propName, componentName) => {
    const modifiers = props[propName];

    const isResponsive = isObject(modifiers) && !isArray(modifiers);

    /* eslint-disable indent */
    // Prettier and ESLint have different ideas on how to indent this. Prettier wins.
    const validModifiers = isResponsive
      ? validateResponsiveModifiers(
          propName,
          componentName,
          modifiers,
          modifierConfig,
        )
      : validateModifiers(propName, componentName, modifiers, modifierConfig);
    /* eslint-enable indent */

    if (isError(validModifiers)) {
      return validModifiers;
    }

    return null;
  };
}
