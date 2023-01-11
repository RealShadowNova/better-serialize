import { Serialize } from './Serialize';

/**
 * Stringifies a Node.js data format into a {@link Serialize.JsonCompatible} string.
 * @since 1.0.0
 * @param data The Node.js data format to stringify.
 * @returns The {@link Serialize.JsonCompatible} string of the Node.js data format.
 */
export function stringify(data: unknown): string {
  return JSON.stringify(Serialize.toJsonCompatible(data));
}
