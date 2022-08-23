export function assert(
  condition: any,
  errorMessage: string
): asserts condition {
  if (!condition) {
    throw new Error(errorMessage);
  }
}

export function isDefined<T>(data: T | null | undefined): data is T {
  return data !== null && data !== undefined;
}
