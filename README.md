# Styled Components Modifiers

[![CircleCI master build](https://img.shields.io/circleci/project/github/Decisiv/styled-components-modifiers/master.svg)](https://circleci.com/gh/Decisiv/styled-components-modifiers)
[![npm version](https://img.shields.io/npm/v/styled-components-modifiers.svg)](https://www.npmjs.com/package/styled-components-modifiers)
[![npm downloads](https://img.shields.io/npm/dt/styled-components-modifiers.svg)](https://www.npmjs.com/package/styled-components-modifiers)


Styled Components are incredibly useful when building an application, but the community lacks guidelines and best practices for how to structure, organize, and modify a component library. Fortunately, the CSS ecosystem has several solutions for this, including the very well-thought-out [Block, Element, Modifier (BEM) conventions](http://getbem.com).

This library enhances [`styled-components`](https://www.styled-components.com/) by allowing you to use BEM-flavored conventions when building your components.

## Installation

This package is available on npm as `styled-components-modifiers`, and you can find it [here](https://www.npmjs.com/package/styled-components-modifiers).

To install the latest stable version with `yarn`:

```sh
$ yarn add styled-components-modifiers
```

...or with `npm`:

```sh
$ npm install styled-components-modifiers --save
```

## Blocks and Elements

Our method for structuring Blocks and Elements doesn’t actually require any special tooling. It’s a simple convention we use for namespacing the components. You just need to add the Elements as properties of a Block component:

```jsx
  // Define your Button styled component (the Block)
  const Button = styled.button``;

  // Define your Icon styled component (the Element)
  const Icon = styled(FontAwesome);

  // Add the Icon as a property of the Button
  Button.Icon = Icon;

  // To render these components...
  render() {
    return (
      <Button>
        <Button.Icon />
      </Button>
    )
  }
```

This gives us a nice namespacing that's easy to visualize in a Blocks and Elements structure.

But what about _modifiers_?

## Modifiers

Our implementation of modifiers, as applied to `styled-components`, looks like this:

```jsx
  <Button modifiers={['success', 'large']}>...</Button>
```

The modifiers are passed in as an array of flags, each of which changes the appearance, behavior, or state of the Block or Element component to which they are applied.

## Defining Modifiers

The core of `styled-components-modifiers` is a modifier configuration object. The _keys_ in this object become the available flags that can be passed to the component's `modifiers`  prop. Each _value_ in the configuration object is a function that returns an object with a `styles` key.

For our demo, let's first set up a modifier configuration object:

```jsx
const MODIFIER_CONFIG = {
  // The functions receive the props of the component as the only argument.
  // Here, we destructure the theme from the argument for use within the modifier styling.
  disabled: ({ theme }) => ({
    // The `styles` in a definition are applied any time the modifier is used.
    styles: `
      background-color: ${theme.colors.grey_400};
      color: ${theme.colors.grey_100};
    `,
  }),

  success: ({ theme }) => ({
    styles: `
      background-color: ${theme.colors.success};
    `,
  }),

  warning: ({ theme }) => ({
    styles: `
      background-color: ${theme.colors.warning};
    `,
  }),

  large: () => ({
    styles: `
      height: 3em;
      width: 6em;
    `,
  }),
};
```

Then, we need to apply the modifier configuration object (`MODIFIER_CONFIG`) to the styled component we want to modify:

```jsx
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const Button = styled.button`
  // Any styles that won't change or may be overruled can go
  // above where you apply the style modifiers.
  // In BEM, this would be the styles you apply in either the
  // Block or Element class's primary definition
  font-size: 24px;
  padding: 16px

  // Then apply the modifier configuration:
  ${applyStyleModifiers(MODIFIER_CONFIG)}
`;

export default Button;
```

The end result is a block (`Button`) with four available modifiers (`disabled`, `success`, `warning`, and `large`).

## Applying Modifiers

Applying modifiers when rendering the component is as simple as providing a `modifiers` prop. The prop should be an array of strings representing the keys in the modifier configuration object you wish to apply.

```jsx
function Form() {
  return (
    <div>
      // ...the rest of form goes here...

      // Render a button, and give it a `modifiers` prop with the desired modifiers.
      <Button modifiers={['success']} />
    </div>
  )
}
```

In the example above, our button will have the `styles` from the `success` modifier applied.

## Validating Modifiers

Based on that, you can see how easy it would be to pass a value to a `modifiers` prop that is not found in the component's modifier configuration object. Fortunately, we have a tool to help with that: just validate the `modifiers` prop with `styleModifierPropTypes`:

```jsx
// In the Button component's file
import { styleModifierPropTypes } from 'styled-components-modifiers';

// ...the Button definition, as seen above, goes here...

Button.propTypes = {
  modifiers: styleModifierPropTypes(MODIFIER_CONFIG),
}
```
This will validate that only keys found within our `MODIFIER_CONFIG` are supplied to the styled component. It will also throw a `PropTypes` error if an invalid modifier is used.

## Responsive Modifiers

When designing components that are intended to be responsive, you may find it useful to apply different styles based on a `size` prop as shown below.

```jsx
import styled from 'styled-components';
import {
  applyResponsiveStyleModifiers,
  applyStyleModifiers,
  responsiveStyleModifierPropTypes,
  styleModifierPropTypes ,
} from 'styled-components-modifiers';

// Define the MODIFIER_CONFIG in exactly the same way as above. You would use the same
// modifier configuration for responsive and non-responsive modifiers.

const Button = styled.button`
  // ...define your base styles here...

  // Apply the modifier configuration:
  ${applyStyleModifiers(MODIFIER_CONFIG)}

  // Then apply the responsive modifiers.
  // This must happen AFTER the normal modifiers have been applied.
  ${applyResponsiveStyleModifiers(MODIFIER_CONFIG)}
`;

Button.propTypes = {
  // Setup validation of the "normal" modifier flags:
  modifiers: styleModifierPropTypes(MODIFIER_CONFIG),
  // You can also validate the responsive modifier flags:
  responsiveModifiers: responsiveStyleModifierPropTypes(MODIFIER_CONFIG),
}

export default Button;
```

Using responsive modifiers is a little bit different, though, but just as simple:

```jsx
  <Button
    responsiveModifiers={{
      small: ['disabled'],
      medium: ['success', 'large'],
    }}
    size={getTheSizeFromSomewhere()}
  />
```

It works by matching the `size` prop provided to the component with the keys of the `responsiveModifiers` prop, and then applying the appropriate modifier(s) based on the corresponding value in `responsiveModifiers`.

So, for example, when `Button` receives a prop `size` with a value equal to `medium`, the modifiers `success` and `large` will be applied to the `Button`. If `size` does not match any key in the `responsiveModifiers`, _no_ modifiers will be applied.

Tada! Responsive styling!

## Alternative Prop Names

Finally, let’s say you want to apply multiple modifier arrays, or perhaps you just really don't like naming the prop `modifiers`. You can name the prop something else when you apply the props to your component:

```jsx
const Button = styled.button`
  // the prop used for passing modifiers to this button will be
  // named `altPropName` instead of the default `modifiers`:
  ${applyStyleModifiers(MODIFIER_CONFIG, 'altPropName')}
`;
```

The same can be done when you `applyResponsiveStyleModifiers`.

## Contributing

We are thankful for any contributions made by the community. By contributing you agree to abide by the Code of Conduct in our [Contributing Guidelines](https://github.com/Decisiv/styled-components-modifiers/blob/master/.github/CONTRIBUTING.md).

## License

[MIT](https://github.com/Decisiv/styled-components-modifiers/blob/master/LICENSE)
