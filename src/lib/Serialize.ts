import { isObject } from './private';

/**
 * The namespace which contains everything for the transformation of raw Node.js data types.
 * @since 1.0.0
 */
export namespace Serialize {
  /**
   * Converts raw Node.js data types into a JSON-compatible format.
   * @since 1.0.0
   * @param data The raw Node.js data type to convert.
   * @returns The JSON-compatible format of the raw Node.js data type.
   */
  export function toJsonCompatible(data: unknown): JsonCompatible {
    if (isObject(data)) return { [Keying.Type]: Type.Object, [Keying.Value]: toJsonCompatibleObject(data) };
    else if (typeof data === 'string') return { [Keying.Type]: Type.String, [Keying.Value]: data };
    else if (typeof data === 'number') {
      if (Number.isNaN(data)) return { [Keying.Type]: Type.Number, [Keying.Value]: 'NaN' };
      if ([Infinity, -Infinity].includes(data)) return { [Keying.Type]: Type.Number, [Keying.Value]: String(data) };

      return { [Keying.Type]: Type.Number, [Keying.Value]: data };
    } else if (typeof data === 'boolean') return { [Keying.Type]: Type.Boolean, [Keying.Value]: data };
    else if (Array.isArray(data)) return { [Keying.Type]: Type.Array, [Keying.Value]: toJsonCompatibleArray(data) };
    else if (data === null) return { [Keying.Type]: Type.Null };
    else if (data instanceof Date) return { [Keying.Type]: Type.Date, [Keying.Value]: data.toJSON() };
    else if (data === undefined) return { [Keying.Type]: Type.Undefined };
    else if (typeof data === 'bigint') return { [Keying.Type]: Type.BigInt, [Keying.Value]: data.toString() };
    else if (data instanceof RegExp) {
      return { [Keying.Type]: Type.RegExp, [Keying.Value]: { [Keying.Source]: data.source, [Keying.Flags]: data.flags } };
    } else if (data instanceof Map) return { [Keying.Type]: Type.Map, [Keying.Value]: toJsonCompatibleEntries(Array.from(data)) };
    else if (data instanceof Set) return { [Keying.Type]: Type.Set, [Keying.Value]: toJsonCompatibleArray(Array.from(data)) };

    throw new TypeError(`Serialize received an unknown type while formatting: "${data.constructor.name}".`);
  }

  function toJsonCompatibleArray(array: unknown[]): JsonCompatible[] {
    const json: JsonCompatible[] = [];

    for (const value of array) json.push(toJsonCompatible(value));

    return json;
  }

  function toJsonCompatibleEntries(entries: [PropertyKey, unknown][]): [PropertyKey, JsonCompatible][] {
    const json: [PropertyKey, JsonCompatible][] = [];

    for (const [key, value] of entries) json.push([key, toJsonCompatible(value)]);
    return json;
  }

  function toJsonCompatibleObject(object: Record<PropertyKey, unknown>): Record<PropertyKey, JsonCompatible> {
    const json: Record<PropertyKey, JsonCompatible> = {};

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        json[key] = toJsonCompatible(object[key]);
      }
    }

    return json;
  }

  /**
   * Converts JSON-compatible data into a raw Node.js data format.
   * @since 1.0.0
   * @param json The JSON-compatible data to convert.
   * @returns The raw Node.js data format of the JSON-compatible data.
   */
  export function fromJsonCompatible(json: JsonCompatible): unknown {
    const { [Keying.Type]: type, [Keying.Value]: value } = json;

    switch (type) {
      case Type.Array:
        return fromJsonCompatibleArray(value as JsonCompatible[]);

      case Type.BigInt:
        return BigInt(value as string);

      case Type.Boolean:
        return value;

      case Type.Date:
        return new Date(value as string);

      case Type.Map:
        return new Map(fromJsonCompatibleMap(value as [PropertyKey, JsonCompatible][]));

      case Type.Null:
        return null;

      case Type.Number:
        if (typeof value === 'string') return Number(value);

        return value;

      case Type.Object:
        return fromJsonCompatibleObject(value as Record<PropertyKey, JsonCompatible>);

      case Type.RegExp:
        return new RegExp((value as Regex)[Keying.Source], (value as Regex)[Keying.Flags]);

      case Type.Set:
        return new Set(fromJsonCompatibleArray(value as JsonCompatible[]));

      case Type.String:
        return value;

      case Type.Undefined:
        return undefined;

      default:
        throw new TypeError('Serialize received an unknown type.');
    }
  }

  function fromJsonCompatibleArray(json: JsonCompatible[]): unknown[] {
    const arr: unknown[] = [];

    for (const value of json) arr.push(fromJsonCompatible(value));
    return arr;
  }

  function fromJsonCompatibleMap(json: [PropertyKey, JsonCompatible][]): [PropertyKey, unknown][] {
    const arr: [PropertyKey, unknown][] = [];

    for (const [key, value] of json) arr.push([key, fromJsonCompatible(value)]);
    return arr;
  }

  function fromJsonCompatibleObject(json: Record<PropertyKey, JsonCompatible>): Record<PropertyKey, unknown> {
    const obj: Record<PropertyKey, unknown> = {};

    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        obj[key] = fromJsonCompatible(json[key]);
      }
    }

    return obj;
  }

  /**
   * The keying used for JSON-compatible data.
   * @since 1.0.0
   */
  export enum Keying {
    Type = 't',

    Value = 'v',

    Source = 's',

    Flags = 'f'
  }

  /**
   * The types of JSON-compatible data.
   * @since 1.0.0
   */
  export enum Type {
    Array = 4,

    BigInt = 8,

    Boolean = 3,

    Date = 6,

    Map = 10,

    Null = 5,

    Number = 2,

    Object = 0,

    RegExp = 9,

    Set = 11,

    String = 1,

    Undefined = 7
  }

  /**
   * The JSON-compatible data format.
   * @since 1.0.0
   */
  export interface JsonCompatible {
    [Keying.Type]: Type;

    [Keying.Value]?:
      | string
      | number
      | boolean
      | null
      | JsonCompatible[]
      | [PropertyKey, JsonCompatible][]
      | Record<PropertyKey, JsonCompatible>
      | Regex;
  }

  /**
   * The JSON-compatible RegExp format.
   * @since 1.0.0
   */
  export interface Regex {
    [Keying.Source]: string;

    [Keying.Flags]: string;
  }
}
