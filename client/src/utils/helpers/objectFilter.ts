// Helper function - analogous to Array filter

export const objectFilter: (obj: any, fn: any) => any = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => fn(v)));
