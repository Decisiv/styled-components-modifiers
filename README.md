# Styled Components Modifiers

[![CircleCI master build](https://img.shields.io/circleci/project/github/Decisiv/styled-components-modifiers/master.svg)](https://circleci.com/gh/Decisiv/styled-components-modifiers)
[![npm version](https://img.shields.io/npm/v/styled-components-modifiers.svg)](https://www.npmjs.com/package/styled-components-modifiers)
[![npm downloads](https://img.shields.io/npm/dt/styled-components-modifiers.svg)](https://www.npmjs.com/package/styled-components-modifiers)

Styled Components are incredibly useful when building an application, but the
community lacks guidelines and best practices for how to structure, organize,
and modify a component library. Fortunately, the CSS ecosystem has several
solutions for this, including the very well-thought-out
[Block, Element, Modifier (BEM) conventions](http://getbem.com).

This library enhances [`styled-components`](https://www.styled-components.com/)
by allowing you to use BEM-flavored conventions when building your components.

## Contents

- [Styled Components Modifiers](#styled-components-modifiers)
  - [Contents](#contents)
  - [Overview](#overview)
    - [Blocks and Elements](#blocks-and-elements)
    - [Modifiers](#modifiers)
  - [Installation](#installation)
  - [Using Styled Components Modifiers](#using-styled-components-modifiers)
    - [Defining Modifiers](#defining-modifiers)
    - [Validating Modifiers](#validating-modifiers)
    - [Applying Modifiers](#applying-modifiers)
    - [Responsive Modifiers _(deprecated)_](#responsive-modifiers-deprecated)
    - [Alternative Prop Names](#alternative-prop-names)
  - [Built with Styled Components Modifiers](#built-with-styled-components-modifiers)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

### Blocks and Elements

Our method for structuring Blocks and Elements doesn’t actually require any
special tooling. It’s just a simple convention we use for namespacing the
components, add the Elements as properties of a Block component:

```jsx
  // Define your Button styled component (the Block)
  const Button = styled.button``;

  // Define your Icon styled component (the Element)
  const Icon = styled(IconComponent)``;

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

This gives us a nice namespacing that's easy to visualize in a Blocks and
Elements structure.

But what about _modifiers_?

### Modifiers

This tool allows you to implement modifiers and apply them to
`styled-components` like this:

```jsx
<Button modifiers={['success', 'large']}>...</Button>
```

or as a single string like this:

```jsx
<Button modifiers="success">...</Button>
```

The modifiers are passed in as an array of flags or a single flag. Each flag
changes the appearance of the Block or Element component. When passing in an
array, the values are filtered and only strings are used, which means that it is
safe to do the following:

```jsx
<Button modifiers={['large', isLoading && 'loading']}>...</Button>
```

which, if `isLoading` is `false`, resolves to:

```jsx
<Button modifiers={['large', false]}>...</Button>
```

In this case only `large` will be used.

## Installation

This package is
[available on npm as `styled-components-modifiers`](https://www.npmjs.com/package/styled-components-modifiers).

To install the latest stable version with `npm`:

```sh
$ npm install styled-components-modifiers --save
```

...or with `yarn`:

```sh
$ yarn add styled-components-modifiers
```

## Using Styled Components Modifiers

### Defining Modifiers

The core of `styled-components-modifiers` is a modifier configuration object.
The _keys_ in this object become the available flags that can be passed to the
component's `modifiers` prop. Each _value_ defines a function that returns a CSS
style string.

For our demo, let's first set up a modifier configuration object:

```jsx
const MODIFIER_CONFIG = {
  // The functions receive the props of the component as the only argument.
  // Here, we destructure the theme from the argument for use within the modifier styling.
  disabled: ({ theme }) => `
    // These styles are applied any time this modifier is used.
    background-color: ${theme.colors.chrome_400};
    color: ${theme.colors.chrome_100};
  `,

  // Alternatively, you can return an object with your styles under the key `styles`.
  success: ({ theme }) => ({
    styles: `
      background-color: ${theme.colors.success};
    `,
  }),

  // Styled Components exports a `css` util that enables some nice linting and interpolation
  // features. You can use it directly or with the `styles` object pattern.
  warning: ({ theme }) => css`
    background-color: ${theme.colors.warning};
  `,

  large: () => `
    height: 3em;
    width: 6em;
  `,
};
```

Then, we need to apply the modifier configuration object (`MODIFIER_CONFIG`) to
the styled component we want to modify:

```jsx
import styled from 'styled-components';
import { applyStyleModifiers } from 'styled-components-modifiers';

const Button = styled.button`
  // Any styles that won't change or may be overruled can go above where you
  // apply the style modifiers. In BEM, these would be the styles you apply in
  // either the Block or Element class's primary definition.
  font-size: 24px;
  padding: 16px;

  // Then apply the modifier configuration.
  ${applyStyleModifiers(MODIFIER_CONFIG)};

  // You can apply as many modifier configurations as you like, but remember that
  // the last modifiers applied take priority in the event of colliding styles.
`;

export default Button;
```

The end result is a block (`Button`) with four available modifiers (`disabled`,
`success`, `warning`, and `large`).

### Validating Modifiers

Because the modifiers are an arbitrary array of flags, it is very easy to pass a
value as a modifier that is not found in the component's modifier configuration
object. Fortunately, we have a tool to help with that: you can validate the
`modifiers` prop with `styleModifierPropTypes`:

```jsx
// In the Button component's file
import { styleModifierPropTypes } from 'styled-components-modifiers';

// ...the Button definition, as seen above, goes here...

Button.propTypes = {
  modifiers: styleModifierPropTypes(MODIFIER_CONFIG),
};
```

This will validate that only keys found within our `MODIFIER_CONFIG` are
supplied to the styled component. It will also throw a `PropTypes` error if an
invalid modifier is used.

### Applying Modifiers

Applying modifiers when rendering the component is as simple as providing a
`modifiers` prop. The value of this prop can be either a string or an array of
strings. Each string value should correspond to keys in the modifier
configuration object applied to the component.

```jsx
function Form() {
  return (
    <div>
      {/* ...the rest of form goes here... */}
      {/* Render a button, and give it a `modifiers` prop with the desired modifier. */}
      <Button modifiers="success" />

      {/* This is also perfectly valid, and will result in "stacked" modifiers. */}
      <Button modifiers={['success', 'large']} />
    </div>
  );
}
```

You can also apply the modifiers to be responsive. For this, the value of the
`modifiers` prop should be an object where each value is either a string or
array of strings that match a modifier name. Which set of modifiers is chosen
will be based on the value of a `size` prop that you must also provide to the
component.

```jsx
<Button
  modifiers={{
    small: 'disabled', // <-- will be applied when `getTheSizeFromSomewhere()` returns 'small'
    medium: ['success', 'large'],
  }}
  size={getTheSizeFromSomewhere()}
/>
```

**Note:**

If you apply modifiers using the responsive technique and the value of `size`
doesn't match a key in the object, the value of `_` will be applied by default.
This is useful for applying special modifiers only on a single size.

```jsx
<Button
  modifiers={{
    _: 'disabled', // <-- will be applied for all size values _except_ 'medium'.
    medium: ['success', 'large'], // <-- will only be applied if the value of `size` is 'medium'.
  }}
  size={getTheSizeFromSomewhere()}
/>
```

### Responsive Modifiers _(deprecated)_

> This approach to responsive modifiers is deprecated and will be removed in the
> 2.0 release. The same functionality has been added to the normal `modifiers`
> utilities.

When designing components that are intended to be responsive, you may find it
useful to apply different styles based on a `size` prop as shown below.

```jsx
import styled from 'styled-components';
import {
  applyResponsiveStyleModifiers,
  applyStyleModifiers,
  responsiveStyleModifierPropTypes,
  styleModifierPropTypes,
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
};

export default Button;
```

Using responsive modifiers is a little bit different, though, but just as
simple:

```jsx
<Button
  responsiveModifiers={{
    small: 'disabled',
    medium: ['success', 'large'],
  }}
  size={getTheSizeFromSomewhere()}
/>
```

It works by matching the `size` prop provided to the component with the keys of
the `responsiveModifiers` prop, and then applying the appropriate modifier(s)
based on the corresponding value in `responsiveModifiers`.

So, for example, when `Button` receives a prop `size` with a value equal to
`medium`, the modifiers `success` and `large` will be applied to the `Button`.
If `size` does not match any key in the `responsiveModifiers`, _no_ additional
modifiers will be applied. Your normal `modifiers` array will still work exactly
the same.

Tada! Responsive styling!

### Alternative Prop Names

Finally, let’s say you want to apply multiple modifier arrays, or perhaps you
just really don't like naming the prop `modifiers`. You can name the prop
something else when you apply the props to your component:

```jsx
const Button = styled.button`
  // the prop used for passing modifiers to this button will be
  // named `altPropName` instead of the default `modifiers`:
  ${applyStyleModifiers(MODIFIER_CONFIG, 'altPropName')}
`;
```

The same can be done when you `applyResponsiveStyleModifiers` _(deprecated)_.

## Built with Styled Components Modifiers

Here's your chance to showcase work you are proud of! Feel free to add a link to
any projects using Styled Components Modifiers:

Websites/ Apps:

- [React Companies](https://www.react-companies.com/)
  ([code](https://github.com/andrewtpoe/react-companies)) - A curated list of
  companies using React JS in production, organized by industry.
- Add yours here!

Component Libraries:

- Add yours here!

## Contributing

We are thankful for any contributions made by the community. By contributing you
agree to abide by the Code of Conduct in our
[Contributing Guidelines](https://github.com/Decisiv/styled-components-modifiers/blob/master/.github/CONTRIBUTING.md).

## License

[MIT](https://github.com/Decisiv/styled-components-modifiers/blob/master/LICENSE)
