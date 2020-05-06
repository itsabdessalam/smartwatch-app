const { STRIPE_SECRET_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
