import _ from 'lodash';

const snakeToCamelCase = (data: Record<string, any>) => _.mapKeys(data, (_values, key) => ((key !== '_id') ? _.camelCase(key) : key));

export default {
  snakeToCamelCase,
};
