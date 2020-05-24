const axios = require('axios');

module.exports = {
  submit(payload) {
    return axios.post('https://formspree.io/xyynezpq', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
