import isObject from 'lodash.isobject';

/**
 * Extracts and builds the required style string based on the provided values.
 * @param {Array} modifierProps An array of strings that must match up with keys in modifierConfig
 * @param {Object} modifierConfig A modifierConfig object that defines the styles
 * @param {Object} componentProps The calling component's props, used when calling the
 *                                config definitions.
 */
export default function modifiedStyles(
  modifierProps = [],
  modifierConfig = {},
  componentProps = {},
) {
  const stylesArr = modifierProps.reduce((acc, modifierName) => {
    const modifierFunc = modifierConfig[modifierName];
    const config = modifierFunc(componentProps);
    const styles = isObject(config) ? config.styles : config;
    return acc.concat(styles);
  }, []);

  return stylesArr.join(' ');
}
