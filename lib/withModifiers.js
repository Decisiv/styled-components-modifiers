// @flow
import * as React from "react";
import applyStyleModifiers from './applyStyleModifiers';
import styleModifierPropTypes from './styleModifierPropTypes';

export type TComponentWithModifiers<Modifier> = React.ComponentType<{
    modifiers?: Modifier | Array<Modifier | false> | false
}>;

export const withModifiers = <T: { [string]: any }> (
    config: T
): ((callback: (any) => any) => TComponentWithModifiers<$Keys<T>>) => {
    return callback => {
        const result = callback(applyStyleModifiers(config));
        if (process.env.NODE_ENV !== "production") {
            result.propTypes = {
                modifiers: styleModifierPropTypes(config)
            };
            result._possibleModifiers = Object.keys(config);
        }

        return result;
    };
};
