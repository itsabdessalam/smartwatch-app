const { API_URL_AUTH } = require("../config");
const axios = require("axios");

module.exports = {
  login(user) {
    return axios.post(`${API_URL_AUTH}/auth/login`, user, {
      "Content-Type": "application/json",
    });
  },
  register() {
    return axios.post(`${API_URL_AUTH}/auth/register`, user, {
      "Content-Type": "application/json",
    });
  },
  ping() {},
};
