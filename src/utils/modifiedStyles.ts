import isFunction from 'lodash.isfunction';
import isObject from 'lodash.isobject';
import { SimpleInterpolation } from 'styled-components';

import normalizeModifiers from './normalizeModifiers';

import {
  ComponentProps,
  ModifierConfigValue,
  ModifierKeys,
  ModifierName,
  ModifierObjValue,
  ModifiersConfig,
} from '../types';

/**
 * Evaluates if the first argument is of the ModifierObjValue type
 * @param {*} val
 * @returns {val is ModifierObjValue}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isModifierObjValue(val: any): val is ModifierObjValue {
  return isObject(val) && !!(val as ModifierObjValue).styles;
}

/**
 * Extracts and builds the required style string based on the provided values.
 * @export
 * @param {ModifierKeys} [modifierKeys=[]]
 * @param {ModifiersConfig} [modifierConfig={}]
 * @param {ComponentProps} [componentProps]
 * @returns {SimpleInterpolation}
 */
export default function modifiedStyles(
  modifierKeys: ModifierKeys = [],
  modifierConfig: ModifiersConfig = {},
  componentProps: ComponentProps,
): SimpleInterpolation {
  const stylesArr = normalizeModifiers(modifierKeys).reduce(
    (acc: string[], modifierName: ModifierName): string[] => {
      const modifierConfigValue: ModifierConfigValue =
        modifierConfig[modifierName];

      if (isFunction(modifierConfigValue)) {
        const config = modifierConfigValue(componentProps);

        if (!config) {
          return acc;
        }

        const styles = isModifierObjValue(config)
          ? (config as ModifierObjValue).styles
          : config;

        return Array.isArray(styles)
          ? acc.concat(styles.join(''))
          : acc.concat(`${styles}`);
      }

      return acc;
    },
    [],
  );

  return stylesArr.join(' ');
}
