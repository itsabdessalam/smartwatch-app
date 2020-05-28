const { deepClone } = require('../utils/object');

const shuffle = array => {
  const ref = deepClone(array);

  for (let i = ref.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [ref[i], ref[j]] = [ref[j], ref[i]];
  }

  return ref;
};

const sortByField = (array, field, order = 'asc') => {
  const ref = deepClone(array);
  return ref.sort((a, b) =>
    order === 'asc' ? a[field] - b[field] : b[field] - a[field],
  );
};

module.exports = { shuffle, sortByField };
