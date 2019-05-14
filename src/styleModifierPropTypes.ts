import difference from 'lodash.difference';
import flatten from 'lodash.flatten';
import forIn from 'lodash.forin';
import keys from 'lodash.keys';
import uniq from 'lodash.uniq';
import { Validator } from 'prop-types';

import normalizeModifiers from './utils/normalizeModifiers';
import isResponsiveModifiers from './utils/isResponsiveModifiers';

/**
 * Returns an error if we have invalid modifiers or sizes with errors
 *
 * @param {string} modifiersPropName
 * @param {string} componentName
 * @param {ModifierNames} invalidModifiers
 * @param {string[]} sizesWithErrors
 * @returns {Error}
 */
function generateError(
  modifiersPropName: string,
  componentName: string,
  invalidModifiers: string[],
  sizesWithErrors?: string[],
) {
  const m = invalidModifiers.length > 1 ? 'modifiers' : 'modifier';
  const modifierList = invalidModifiers.join(', ');
  const k = sizesWithErrors && sizesWithErrors.length > 1 ? 'keys' : 'key';

  return new Error(
    `Invalid ${m} ${modifierList} used in prop '${modifiersPropName}'${
      sizesWithErrors ? ` (size ${k} ${sizesWithErrors.join(', ')})` : ''
    } and supplied to ${componentName}. Validation failed.`,
  );
}

/**
 * Returns the invalid modifiers
 *
 * @param {ModifierKeys} modifierKeys
 * @param {ModifiersConfig} modifiersConfig
 * @returns {string[]}
 */
function getInvalidModifiers(
  modifierKeys: ModifierKeys,
  modifiersConfig: ModifiersConfig,
) {
  return difference(normalizeModifiers(modifierKeys), keys(modifiersConfig));
}

/**
 * Checks for invalid modifiers
 *
 * @param {string} modifiersPropName
 * @param {string} componentName
 * @param {ModifierKeys} modifierKeys
 * @param {ModifiersConfig} modifierConfig
 * @returns {Error|Null}
 */
function validateModifiers(
  modifiersPropName: string,
  componentName: string,
  modifierKeys: ModifierKeys,
  modifierConfig: ModifiersConfig,
) {
  const invalidModifiers = getInvalidModifiers(modifierKeys, modifierConfig);

  if (invalidModifiers.length > 0) {
    return generateError(modifiersPropName, componentName, invalidModifiers);
  }

  return null;
}

/**
 * Checks for invalid modfiers for responsive modifiers
 *
 * @export
 * @param {string} modifiersPropName
 * @param {string} componentName
 * @param {ResponsiveModifiers} responsiveModifiers
 * @param {ModifiersConfig} modifierConfig
 * @returns {Error|Null}
 */
export function validateResponsiveModifiers(
  modifiersPropName: string,
  componentName: string,
  responsiveModifiers: ResponsiveModifiers,
  modifierConfig: ModifiersConfig,
) {
  const rawInvalidModifiers: Array<string[]> = [];
  const rawSizesWithErrors: string[] = [];

  forIn(responsiveModifiers, (modifiers, size) => {
    const invalidModifiers = getInvalidModifiers(modifiers, modifierConfig);
    if (invalidModifiers.length > 0) {
      rawInvalidModifiers.push(invalidModifiers);
      rawSizesWithErrors.push(size);
    }
  });

  const invalidModifiers = uniq(flatten(rawInvalidModifiers));
  const sizesWithErrors = uniq(rawSizesWithErrors);

  if (invalidModifiers.length > 0) {
    return generateError(
      modifiersPropName,
      componentName,
      invalidModifiers,
      sizesWithErrors,
    );
  }

  return null;
}

/**
 * Evaluates the modifiers prop against the modifier config. Throws invalid proptype error
 * if a modifier is supplied in prop and not found in modifier config.
 * @export
 * @param {ModifiersConfig} modifierConfig
 * @returns {Validator<ModifierKeys>}
 */
export default function styleModifierPropTypes(
  modifierConfig: ModifiersConfig,
): Validator<ModifierKeys> {
  return (
    props: ComponentProps,
    modifiersPropName: string,
    componentName: string,
  ) => {
    const modifiers = props[modifiersPropName];

    /* eslint-disable indent */
    // Prettier and ESLint have different ideas on how to indent this. Prettier wins.
    return isResponsiveModifiers(modifiers)
      ? validateResponsiveModifiers(
          modifiersPropName,
          componentName,
          modifiers,
          modifierConfig,
        )
      : validateModifiers(
          modifiersPropName,
          componentName,
          modifiers as ModifierKeys,
          modifierConfig,
        );
    /* eslint-enable indent */
  };
}
