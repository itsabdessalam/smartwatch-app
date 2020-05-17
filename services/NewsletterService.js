const API_URL_NEWSLETTER = process.env.GRIDSOME_API_URL_NEWSLETTER;
const axios = require('axios');

module.exports = {
  subscribe(payload) {
    return axios.post(API_URL_NEWSLETTER, payload, {
      'Content-Type': 'application/json',
    });
  },
};
