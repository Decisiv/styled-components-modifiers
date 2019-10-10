import isObject from 'lodash/isObject';

import { ResponsiveModifiersProp, ModifiersConfig } from '../types';

/**
 * Evaluates if the first argument is of the ResponsiveModifiersProp type
 * @export
 * @param {*} val
 * @returns {val is ResponsiveModifiersProp}
 */
export default function isResponsiveModifiersProp(
  val: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): val is ResponsiveModifiersProp<ModifiersConfig, {}> {
  return isObject(val) && !Array.isArray(val);
}
