
/**
 * A helper utility to safely access properties from unknown types
 * @param data The data of unknown type
 * @param defaultValue The default value to return if data is nullish
 * @returns The data cast to type T, or the default value
 */
export function typeSafeCast<T>(data: unknown, defaultValue: T): T {
  if (data === null || data === undefined) {
    return defaultValue;
  }
  return data as T;
}

/**
 * A helper utility to safely access array properties from unknown types
 * @param data The data of unknown type
 * @returns The data cast to array type, or an empty array
 */
export function typeSafeArray<T>(data: unknown): T[] {
  if (Array.isArray(data)) {
    return data as T[];
  }
  return [];
}

/**
 * A helper utility to safely access numeric properties from unknown types
 * @param data The data of unknown type
 * @param defaultValue The default value to return if data is not a number
 * @returns The data as a number, or the default value
 */
export function typeSafeNumber(data: unknown, defaultValue: number = 0): number {
  if (typeof data === 'number' && !isNaN(data)) {
    return data;
  }
  if (typeof data === 'string' && !isNaN(Number(data))) {
    return Number(data);
  }
  return defaultValue;
}

/**
 * A helper utility to safely access string properties from unknown types
 * @param data The data of unknown type
 * @param defaultValue The default value to return if data is not a string
 * @returns The data as a string, or the default value
 */
export function typeSafeString(data: unknown, defaultValue: string = ''): string {
  if (typeof data === 'string') {
    return data;
  }
  if (data !== null && data !== undefined) {
    return String(data);
  }
  return defaultValue;
}

/**
 * A helper utility to safely access boolean properties from unknown types
 * @param data The data of unknown type
 * @param defaultValue The default value to return if data is not a boolean
 * @returns The data as a boolean, or the default value
 */
export function typeSafeBoolean(data: unknown, defaultValue: boolean = false): boolean {
  if (typeof data === 'boolean') {
    return data;
  }
  if (data === 'true') return true;
  if (data === 'false') return false;
  return defaultValue;
}

/**
 * A helper utility to safely parse an object from unknown data
 * @param data The data of unknown type
 * @param defaultValue The default value to return if data is not an object
 * @returns The data cast to type T, or the default value
 */
export function safeParse<T>(data: unknown, defaultValue: T): T {
  if (data !== null && data !== undefined) {
    return data as T;
  }
  return defaultValue;
}
