const axios = require('axios');

module.exports = {
  submit(payload) {
    return axios.post('/', payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
};
