if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

module.exports = {
  LOCALE: "fr-FR",
  API_URL_WP: process.env.API_URL_WP,
};
