const isValidEmail = value => {
  return value && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
};
const isValidPassword = value => {
  return value && value.length >= 8;
};
const startsWith = (value, search) => {
  return value && value.indexOf(search) === 0;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  startsWith,
};
