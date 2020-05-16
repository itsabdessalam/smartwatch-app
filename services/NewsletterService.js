const { API_URL_NEWSLETTER } = require("../config");
const axios = require("axios");

module.exports = {
  subscribe(payload) {
    return axios.post(API_URL_NEWSLETTER, payload, {
      "Content-Type": "application/json",
    });
  },
};
