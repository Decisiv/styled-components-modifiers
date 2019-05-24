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
  return (
    props: ComponentProps & {
      size: string;
      [modifiersPropName: string]: ModifiersProp<ModifiersConfig>;
    },
  ): SimpleInterpolation => {
    const modifiers = props[modifiersPropName];

    if (isResponsiveModifiersProp(modifiers)) {
      return modifiedStyles(
        (modifiers as ModifierKeys)[props.size || DEFAULT_MODIFIERS_KEY],
        modifiersConfig,
        props,
      );
    }

    return modifiedStyles(modifiers, modifiersConfig, props);
  };
}
