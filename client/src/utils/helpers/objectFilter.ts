// Helper function - analogous to Array filter

export const objectFilter : (obj : any, fn : any) => any = (obj, fn) => Object.fromEntries(
    Object.entries(obj).filter(
      ([k, v], i) => fn(v),
    )
  )
  