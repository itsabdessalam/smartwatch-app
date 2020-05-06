<template>
  <div>
    <button @click="redirectToCheckout">Buy me</button>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../../config";

export default {
  data() {
    return {};
  },
  methods: {
    async redirectToCheckout(event) {
      event.preventDefault();
      const stripePromise = await loadStripe(STRIPE_PUBLIC_KEY);
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        items: [{ sku: "sku_HEEwsx1IK4TfNB", quantity: 1 }],
        successUrl: `http://localhost:8080/about`,
        cancelUrl: `http://localhost:8080/`,
      });
      if (error) {
        console.warn("Error:", error);
      }
    },
  },
};
</script>
