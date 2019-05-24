/**
 * TODO: (DEPRECATED) The functionality provided here is now incorporated into
 * `styleModifierPropTypes`. This should be removed before the v2 release.
 */

import { Validator } from 'prop-types';

import isResponsiveModifiersProp from './utils/isResponsiveModifiersProp';
import { validateResponsiveModifiers } from './styleModifierPropTypes';
import {
  ComponentProps,
  ModifierKeys,
  ModifiersConfig,
  ModifiersProp,
} from './types';

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
  const validator = (
    props: ComponentProps & {
      [propName: string]: ModifiersProp<ModifiersConfig>;
    },
    propName: string,
    componentName: string,
  ): Error | null => {
    const responsiveModifiers = props[propName];

    if (isResponsiveModifiersProp(responsiveModifiers)) {
      return validateResponsiveModifiers(
        propName,
        componentName,
        responsiveModifiers,
        modifierConfig,
      );
    }

    return null;
  };

  return validator as Validator<ModifierKeys>;
}
