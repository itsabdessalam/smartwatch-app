const axios = require('axios');

module.exports = {
  send(payload) {
    return axios.post('/', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};
