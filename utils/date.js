const toLocaleDate = (date, locale = 'en-EN') => {
  const localeDate = new Date(date);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return localeDate.toLocaleDateString(locale, options);
};

module.exports = {
  toLocaleDate,
};
