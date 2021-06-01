// helpers for table filtering

// takes in an enum and returns a filter object containing enum key to boolean pairs, initialized to true
// e.g. enum {"a", "b"} => {"a": true, "b": true}
export function initializeFilterObject<T extends { [key: number]: string }>(enumObj: T): Record<string, boolean> {
  const keys: string[] = Object.values(enumObj);
  const filterObject: Record<string, boolean> = {};
  keys.forEach((key) => filterObject[key] = true);
  return filterObject;
}

// takes in a filter object and returns a comma-separated string representation
// e.g. {"a": true, "b": false, "c": true} => ",a,c"
export function convertFilterObjectToQueryString(filterObj: Record<string, boolean>): string {
  return Object.keys(filterObj).reduce((a, b) => (filterObj[b] ? `${a},${b}` : a), '');
}
