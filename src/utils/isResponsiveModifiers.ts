import isObject from 'lodash.isobject';

/**
 * Evaluates if the first argument is of the ResponsiveModifiers type
 * @export
 * @param {*} val
 * @returns {val is ResponsiveModifiers}
 */
export default function isResponsiveModifiers(
  val: any,
): val is ResponsiveModifiers {
  return isObject(val) && !Array.isArray(val);
}
