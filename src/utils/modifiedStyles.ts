import isFunction from 'lodash/isFunction';
import { SimpleInterpolation } from 'styled-components';

import normalizeModifiers from './normalizeModifiers';

import {
  ComponentProps,
  ModifierKeys,
  ModifierName,
  ModifiersConfig,
} from '../types';

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
    (
      acc: SimpleInterpolation[],
      modifierName: ModifierName,
    ): SimpleInterpolation[] => {
      const modifierConfigValue = modifierConfig[modifierName];

      if (isFunction(modifierConfigValue)) {
        const styles = modifierConfigValue(componentProps);

        return Array.isArray(styles)
          ? acc.concat((styles as SimpleInterpolation[]).join(''))
          : acc.concat(styles);
      }

      return acc;
    },
    [],
  );

  return stylesArr.join(' ');
}
