const { API_URL_NEWSLETTER } = require("../config");
const axios = require("axios");

module.exports = {
  subscribe(data) {
    return axios.post(API_URL_NEWSLETTER, { ...data });
  },
};
