// Helper function - analogous to Array map

export const objectMap: (obj: any, fn: any) => any = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));
