/**
 * TODO: (DEPRECATED) The functionality provided here is now incorporated into
 * `styleModifierPropTypes`. This should be removed before the v2 release.
 */

import { DEFAULT_MODIFIERS_KEY } from './constants';

import isResponsiveModifiers from './utils/isResponsiveModifiers';
import modifiedStyles from './utils/modifiedStyles';

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
) {
  return (props: ComponentProps) => {
    const { [modifiersPropName]: responsiveModifiers, ...otherProps } = props;

    if (isResponsiveModifiers(responsiveModifiers)) {
      const activeModifiers =
        responsiveModifiers &&
        ((props.size && responsiveModifiers[props.size]) ||
          responsiveModifiers[DEFAULT_MODIFIERS_KEY]);
      return modifiedStyles(activeModifiers, modifiersConfig, otherProps);
    }
    return null;
  };
}
