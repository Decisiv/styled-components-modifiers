/**
 * TODO: (DEPRECATED) The functionality provided here is now incorporated into
 * `styleModifierPropTypes`. This should be removed before the v2 release.
 */

import { Validator } from 'prop-types';

import isResponsiveModifiers from './utils/isResponsiveModifiers';
import { validateResponsiveModifiers } from './styleModifierPropTypes';

/**
 * Evaluates the modifiers prop against the modifier config. Throws invalid proptype error
 * if a modifier is supplied in prop and not found in modifier config.
 * @export
 * @param {ModifiersConfig} modifierConfig
 * @returns {Validator<ModifierKeys>}
 */
export default function responsiveStyleModifierPropTypes(
  modifierConfig: ModifiersConfig,
): Validator<ModifierKeys> {
  return (props: ComponentProps, propName: string, componentName: string) => {
    const responsiveModifiers = props[propName];

    if (isResponsiveModifiers(responsiveModifiers)) {
      return validateResponsiveModifiers(
        propName,
        componentName,
        responsiveModifiers,
        modifierConfig,
      );
    }
    return null;
  };
}
