export function isObject<Value = unknown>(value: unknown): value is Record<PropertyKey, Value> {
  return typeof value === 'object' && value?.constructor === Object;
}
