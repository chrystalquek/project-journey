// helpers for table filtering

// takes in an enum and returns a filter object containing
// enum key to boolean pairs, initialized to true
// e.g. enum {"a", "b"} => {"a": true, "b": true}
export function initializeFilterObject<T extends { [key: number]: string }>(
  enumObj: T
): Record<string, boolean> {
  const keys: string[] = Object.values(enumObj);
  const filterObject: Record<string, boolean> = {};
  keys.forEach((key) => {
    filterObject[key] = true;
  });
  return filterObject;
}

/**
 * @returns the filters that are applied (ie is set to true).
 */
export function convertFilterObjectToArray(
  filterObj: Record<string, boolean>
): string[] {
  return Object.keys(filterObj).filter((volType) => filterObj[volType]);
}
