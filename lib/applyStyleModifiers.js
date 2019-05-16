import isArray from 'lodash.isarray';
import isObject from 'lodash.isobject';

import { DEFAULT_MODIFIERS_KEY } from './constants';

import modifiedStyles from './utils/modifiedStyles';

/**
 * Returns a function that evaluates a modifierConfig object against a component's props.
 * This function will return a string of CSS styles based on those inputs.
 * @param {Object} modifierConfig A modifierConfig object that defines the styles
 * @param {string} [modifierPropName=modifiers] The name of the prop that contains
 *                                              the modifiers array
 */
export default function applyStyleModifiers(
  modifierConfig,
  modifierPropName = 'modifiers',
) {
  return props => {
    const { [modifierPropName]: modifiers, ...otherProps } = props;

    if (isObject(modifiers) && !isArray(modifiers)) {
      const activeModifiers =
        modifiers &&
        (modifiers[props.size] || modifiers[DEFAULT_MODIFIERS_KEY]);
      return modifiedStyles(activeModifiers, modifierConfig, otherProps);
    }

    return modifiedStyles(modifiers, modifierConfig, otherProps);
  };
}
