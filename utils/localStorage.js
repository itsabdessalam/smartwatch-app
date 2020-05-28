const setItem = (key, value) => {
  if (!process.isClient || !key || !value) {
    return;
  }

  window.localStorage.setItem(key, value);
};
const getItem = key => {
  if (!process.isClient || !key) {
    return;
  }

  return window.localStorage.getItem(key);
};
const removeItem = key => {
  if (!process.isClient || !key) {
    return;
  }

  window.localStorage.removeItem(key);
};

module.exports = {
  setItem,
  getItem,
  removeItem,
};
