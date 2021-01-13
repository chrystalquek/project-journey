const toCamel = (str) => str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase()
  .replace('-', '')
  .replace('_', ''));

const isObject = function (obj) {
  return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
};

export const keysToCamel = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(obj[k]);
      });

    return n;
  } if (Array.isArray(obj)) {
    return obj.map((i) => keysToCamel(i));
  }

  return obj;
};

const toSnake = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const keysToSnake = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj)
      .forEach((k) => {
        n[toSnake(k)] = keysToSnake(obj[k]);
      });

    return n;
  } if (Array.isArray(obj)) {
    return obj.map((i) => keysToSnake(i));
  }

  return obj;
};

export default { keysToCamel, keysToSnake };
