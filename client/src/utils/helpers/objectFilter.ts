// Helper function - analogous to Array filter

export const objectFilter: (
  obj: Record<string, any>,
  fn: (a: any) => boolean
) => Record<string, any> = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => fn(v)));
