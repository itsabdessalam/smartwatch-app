const API_STRIPE_CHECKOUT = process.env.GRIDSOME_API_STRIPE_CHECKOUT;
const axios = require("axios");

module.exports = {
  createCheckout(payload) {
    return axios.post(`${API_STRIPE_CHECKOUT}`, payload, {
      "Content-Type": "application/json",
    });
  },
};
