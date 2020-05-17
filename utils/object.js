const deepClone = object => {
  const clone = Object.assign({}, object);

  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof object[key] === 'object' ? deepClone(object[key]) : object[key]),
  );

  if (Array.isArray(object) && object.length) {
    clone.length = object.length;
    return [].slice.call(clone);
  }

  return Array.isArray(object) ? [].slice.call(object) : clone;
};

module.exports = {
  deepClone,
};
