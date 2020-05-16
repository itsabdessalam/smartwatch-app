const { STRIPE_SECRET_KEY, API_STRIPE_CHECKOUT } = require("../config");
// const stripe = require("stripe")(STRIPE_SECRET_KEY);
const axios = require("axios");

module.exports = {
  createCheckout(payload) {
    return axios.post(`${API_STRIPE_CHECKOUT}`, payload, {
      "Content-Type": "application/json",
    });
  },
};
