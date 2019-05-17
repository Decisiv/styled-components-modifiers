type ModifierName = string;

type ModifierNames = ModifierName[];

/**
 * The single modifier key or array of modifier keys
 */
type ModifierKeys = ModifierNames | ModifierName;

/**
 * An object where the keys are breakpoint sizes and the values are valid ModifierKeys.
 */
interface ResponsiveModifiers {
  [key: string]: ModifierKeys;
}

/**
 * The prop passed to the component when it is rendered.
 */
type ModifiersProp = ResponsiveModifiers | ModifierKeys;

interface ModifierObjValue {
  styles: SimpleInterpolation;
}

type ModifierConfigValue = (
  props: ComponentProps,
) => SimpleInterpolation | ModifierObjValue;

/**
 * An object declaring modifiers for use within a component.
 */
interface ModifiersConfig {
  [key: string]: ModifierConfigValue;
}

/**
 * The component's props.
 */
type ComponentProps = Partial<{
  size?: string;
  theme: DefaultTheme;
  [modifiersPropName: string]: ModifiersProp;
}>;
