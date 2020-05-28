const size = value => {
  if (value == null) {
    return 0;
  }
  if (typeof value === 'object') {
    return value.size || value.length || Object.keys(value).length;
  }
  if (typeof value === 'string') {
    return value.length;
  }
};

const isEmpty = value => value == null || !(Object.keys(value) || value).length;

const isString = value => typeof value === 'string';

module.exports = { size, isEmpty, isString };
