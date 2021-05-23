/**
 * Helper function to deal with validation of request body inputs
 * @param enumTypes Array of accepted string values
 * @param enumName Variable name used for identification in error statement
 * @param value String to test out against enumTypes
 */
export const stringEnumValidator = (
  enumTypes: Array<string>,
  enumName: string,
  value: string,
) => {
  if (!_.includes(enumTypes, value)) {
    throw new Error(
      `${enumName}: "${value}" must be either ${enumTypes.join(', ')}`,
    );
  }
  return true;
};

export const regexValidator = (regexExp: RegExp, regexName : string, value: string) => {
  if (!regexExp.test(value)) {
    throw new Error(`${regexName}: "${value}" must conform with the regex ${regexExp}`);
  }

  return true;
};
