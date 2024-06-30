/**
 * @description
 * Transforms object's properties into getter methods.
 * For each property, creates a method prefixed with 'get' that returns the property value.
 */
type PropertiesGetterType<T> = T extends Record<string, unknown>
  ? { [K in keyof T as `get${Capitalize<K & string>}`]: () => T[K] }
  : never;
