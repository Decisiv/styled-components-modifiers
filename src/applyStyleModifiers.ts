import { InterpolationFunction, SimpleInterpolation } from 'styled-components';

import { DEFAULT_MODIFIERS_KEY } from './constants';

import isResponsiveModifiers from './utils/isResponsiveModifiers';
import modifiedStyles from './utils/modifiedStyles';

/**
 * Returns a function that evaluates a modifiersConfig object against a component's props.
 * This function will return a string of CSS styles based on those inputs.
 * @export
 * @param {ModifiersConfig} modifiersConfig
 * @param {string} [modifiersPropName="modifiers"]
 * @returns
 */
export default function applyStyleModifiers(
  modifiersConfig: ModifiersConfig,
  modifiersPropName: string = 'modifiers',
): InterpolationFunction<ComponentProps> {
  return (props: ComponentProps): SimpleInterpolation => {
    const { [modifiersPropName]: modifiers, ...otherProps } = props;

    if (isResponsiveModifiers(modifiers)) {
      const activeModifiers =
        modifiers &&
        ((props.size && modifiers[props.size]) ||
          modifiers[DEFAULT_MODIFIERS_KEY]);
      return modifiedStyles(activeModifiers, modifiersConfig, otherProps);
    }

    return modifiedStyles(modifiers, modifiersConfig, otherProps);
  };
}
