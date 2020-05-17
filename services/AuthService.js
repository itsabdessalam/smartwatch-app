const API_URL_AUTH = process.env.GRIDSOME_API_URL_AUTH;
const axios = require('axios');

module.exports = {
  login(user) {
    return axios.post(`${API_URL_AUTH}/auth/login`, user, {
      'Content-Type': 'application/json',
    });
  },
  register(user) {
    return axios.post(`${API_URL_AUTH}/auth/register`, user, {
      'Content-Type': 'application/json',
    });
  },
  ping() {},
};
