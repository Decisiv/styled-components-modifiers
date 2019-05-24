import { ModifierKeys, ModifierNames } from '../types';

/**
 * Normalizes string modifier props to be an array.
 * @export
 * @param {ModifierKeys} modifierKeys
 * @returns {ModifierNames}
 */
export default function normalizeModifiers(
  modifierKeys: ModifierKeys,
): ModifierNames {
  return (Array.isArray(modifierKeys) ? modifierKeys : [modifierKeys]).filter(
    (i): boolean => typeof i === 'string' && !!i,
  );
}
