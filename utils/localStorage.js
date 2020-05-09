module.exports = {
  setItem(key, value) {
    if (!process.isClient || !key || !value) {
      return;
    }

    window.localStorage.setItem(key, value);
  },
  getItem(key) {
    if (!process.isClient || !key) {
      return;
    }

    return window.localStorage.getItem(key);
  },
  removeItem(key) {
    if (!process.isClient || !key) {
      return;
    }

    window.localStorage.removeItem(key);
  },
};
