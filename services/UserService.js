const API_URL_AUTH = process.env.GRIDSOME_API_URL_AUTH;
const axios = require('axios');

module.exports = {
  getUserOrders(id, token) {
    return axios.get(`${API_URL_AUTH}/users/${id}/orders`, {
      headers: { token },
    });
  },
  getUsers(token) {
    return axios.get(`${API_URL_AUTH}/users`, {
      headers: { token },
    });
  },
};
