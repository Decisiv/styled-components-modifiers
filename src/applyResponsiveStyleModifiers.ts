/**
 * TODO: (DEPRECATED) The functionality provided here is now incorporated into
 * `styleModifierPropTypes`. This should be removed before the v2 release.
 */

import { InterpolationFunction, SimpleInterpolation } from 'styled-components';

import { DEFAULT_MODIFIERS_KEY } from './constants';

import isResponsiveModifiersProp from './utils/isResponsiveModifiersProp';
import modifiedStyles from './utils/modifiedStyles';
import {
  ComponentProps,
  ModifierKeys,
  ModifiersConfig,
  ModifiersProp,
} from './types';

/**
 * Returns a function that evaluates a modifiersConfig object against a component's props,
 * including a size prop. This function will return a string of CSS styles based on those inputs.
 * @export
 * @param {ModifiersConfig} modifiersConfig
 * @param {string} [modifiersPropName="responsiveModifiers"]
 * @returns
 */
export default function applyResponsiveStyleModifiers(
  modifiersConfig: ModifiersConfig,
  modifiersPropName: string = 'responsiveModifiers',
): InterpolationFunction<ComponentProps> {
  return (
    props: ComponentProps & {
      size: string;
      [modifiersPropName: string]: ModifiersProp<ModifiersConfig>;
    },
  ): SimpleInterpolation => {
    const responsiveModifiers = props[modifiersPropName];

    if (isResponsiveModifiersProp(responsiveModifiers)) {
      return modifiedStyles(
        (responsiveModifiers as ModifierKeys)[
          props.size || DEFAULT_MODIFIERS_KEY
        ],
        modifiersConfig,
        props,
      );
    }

    return null;
  };
}
