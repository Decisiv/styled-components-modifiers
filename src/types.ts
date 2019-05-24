import { SimpleInterpolation, StyledProps } from 'styled-components';

export type ModifierName = string;

export type ModifierNames = ModifierName[];

/**
 * The single modifier key or array of modifier keys
 */
export type ModifierKeys = ModifierNames | ModifierName;

/**
 * An object where the keys are breakpoint sizes and the values are valid ModifierKeys.
 */
export type ResponsiveModifiersProp<MC, S> = {
  _?: keyof MC | (keyof MC)[];
} & { [key in keyof S]?: keyof MC | (keyof MC)[] };

/**
 * The prop passed to the component when it is rendered.
 */
export type ModifiersProp<MC, S extends object = {}> =
  | keyof MC
  | (keyof MC)[]
  | ResponsiveModifiersProp<MC, S>;

export interface ModifierObjValue {
  styles: SimpleInterpolation;
}

export type ModifierConfigValue = (
  props: ComponentProps,
) => SimpleInterpolation | ModifierObjValue;

/**
 * An object declaring modifiers for use within a component.
 */
export interface ModifiersConfig {
  [key: string]: ModifierConfigValue;
}

/**
 * The component's props.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentProps = StyledProps<any>;
