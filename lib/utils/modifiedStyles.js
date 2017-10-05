import keys from 'lodash.keys';
import mapValues from 'lodash.mapvalues';

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
  const modifierValues = mapValues(modifierConfig, config =>
    config(componentProps),
  );

  const stylesArr = keys(modifierConfig).reduce((acc, modifierName) => {
    const config = modifierValues[modifierName];
    const styles = modifierProps.includes(modifierName)
      ? config.styles
      : config.defaultStyles;

    if (process.env.NODE_ENV !== 'production' && config.defaultStyles) {
      console.warn(
        `The ${modifierName} config contains defaultStyles. This functionality is deprecated and will be removed in version 0.1.0`,
      );
    }

    return styles ? acc.concat([styles]) : acc;
  }, []);

  return stylesArr.join(' ');
}
