const { deepClone } = require("../utils/object");

const shuffle = (array) => {
  const ref = deepClone(array);

  for (let i = ref.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [ref[i], ref[j]] = [ref[j], ref[i]];
  }

  return ref;
};

module.exports = { shuffle };
