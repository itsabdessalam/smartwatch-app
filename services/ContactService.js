const API_URL_CONTACT = process.env.GRIDSOME_API_URL_CONTACT;
const axios = require('axios');

module.exports = {
  submit(payload) {
    return axios.post(API_URL_CONTACT, payload, {
      'Content-Type': 'application/json',
    });
  },
};
