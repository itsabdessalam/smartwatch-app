const API_URL_WP = process.env.GRIDSOME_API_URL_WP;
const axios = require("axios");

module.exports = {
  getPosts() {
    return axios.get(`${API_URL_WP}/posts`);
  },
  getProducts() {
    return axios.get(`${API_URL_WP}/products`);
  },
};
