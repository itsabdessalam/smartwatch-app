const { API_URL_WP } = require("../config");
const axios = require("axios");

module.exports = {
  getPosts: () => {
    return axios.get(`${API_URL_WP}/posts`);
  },
  getProducts: () => {
    return axios.get(`${API_URL_WP}/products`);
  },
};
