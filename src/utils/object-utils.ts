export const isObject = (maybeObject: unknown): maybeObject is Record<PropertyKey, unknown> => typeof maybeObject === 'object' && maybeObject !== null;

export const isFunction = (maybeFunction: unknown): maybeFunction is Function => typeof maybeFunction === 'function';
