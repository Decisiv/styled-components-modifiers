import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';

import normalizeModifiers from './normalizeModifiers';

/**
 * Extracts and builds the required style string based on the provided values.
 * @param {Array|String} modifierProps An array of strings or a single string
 *                                     that must match up with keys in modifierConfig
 * @param {Object} modifierConfig A modifierConfig object that defines the styles
 * @param {Object} componentProps The calling component's props, used when calling the
 *                                config definitions.
 */
export default function modifiedStyles(
  modifierProps = [],
  modifierConfig = {},
  componentProps = {},
) {
  const stylesArr = normalizeModifiers(modifierProps)
    .reduce((acc, modifierName) => {
      const modifierFunc = modifierConfig[modifierName];
      if (isFunction(modifierFunc)) {
        const config = modifierFunc(componentProps);
        const styles = isObject(config) ? config.styles : config;
        return acc.concat(styles);
      }
      return acc;
    }, []);

  return stylesArr.join(' ');
}
