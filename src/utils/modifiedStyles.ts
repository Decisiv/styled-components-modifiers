import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';

import normalizeModifiers from './normalizeModifiers';

/**
 * Evaluates if the first argument is of the ModifierObjValue type
 * @param {*} val
 * @returns {val is ModifierObjValue}
 */
function isModifierObjValue(val: any): val is ModifierObjValue {
  return isObject(val) && (val as ModifierObjValue).styles;
}

/**
 * Extracts and builds the required style string based on the provided values.
 * @export
 * @param {ModifierKeys} [modifierKeys=[]]
 * @param {ModifiersConfig} [modifierConfig={}]
 * @param {ComponentProps} [componentProps={}]
 * @returns
 */
export default function modifiedStyles(
  modifierKeys: ModifierKeys = [],
  modifierConfig: ModifiersConfig = {},
  componentProps: ComponentProps = {},
) {
  const stylesArr = normalizeModifiers(modifierKeys).reduce(
    (acc: string[], modifierName: ModifierName) => {
      const modifierConfigValue = modifierConfig[modifierName];
      if (isFunction(modifierConfigValue)) {
        const config: ModifierConfigValue = modifierConfigValue(componentProps);
        const styles: string | string[] = isModifierObjValue(config)
          ? config.styles
          : config;
        return Array.isArray(styles)
          ? (acc as string[]).concat(styles.join(''))
          : (acc as string[]).concat(styles);
      }
      return acc;
    },
    [],
  );

  return stylesArr.join(' ');
}
