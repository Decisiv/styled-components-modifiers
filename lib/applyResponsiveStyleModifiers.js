import modifiedStyles from './utils/modifiedStyles';

/**
 * Returns a function that evaluates a modifierConfig object against a component's props,
 * including a size prop. This function will return a string of CSS styles based on those inputs.
 * @param {Object} modifierConfig A modifierConfig object that defines the styles
 * @param {string} [modifierPropName=responsiveModifiers] The name of the prop that contains
 *                                                        the modifiers array
 */
export default function applyResponsiveStyleModifiers(
  modifierConfig,
  modifierPropName = 'responsiveModifiers',
) {
  return props => {
    const { [modifierPropName]: responsiveModifiers, ...otherProps } = props;
    const activeModifiers =
      responsiveModifiers && responsiveModifiers[props.size];
    return modifiedStyles(activeModifiers, modifierConfig, otherProps);
  };
}
