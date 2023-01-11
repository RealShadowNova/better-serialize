import { Serialize } from './Serialize';

/**
 * Parses a {@link Serialize.JsonCompatible} string into it's raw Node.js data format.
 * @since 1.0.0
 * @param data The {@link Serialize.JsonCompatible} string to parse.
 * @returns The raw Node.js data format of the {@link Serialize.JsonCompatible} string.
 */
export function parse(data: string): unknown {
  return Serialize.fromJsonCompatible(JSON.parse(data));
}
