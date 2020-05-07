<template>
  <Layout>
    <h1>
      Cart
    </h1>
    <button @click="redirectToCheckout">Buy me</button>
  </Layout>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../../config";

export default {
  data() {
    return {
      stripe: null,
    };
  },
  async mounted() {
    const stripePromise = await loadStripe(STRIPE_PUBLIC_KEY);
    this.stripe = await stripePromise;
  },
  methods: {
    async redirectToCheckout(event) {
      console.log("toto", this.stripe);
      const { error } = await this.stripe.redirectToCheckout({
        items: [
          { sku: "sku_HEMt4aFesiEmM9", quantity: 1 },
          {
            sku: "sku_HEMr8DKrKUM05b",
            quantity: 2,
          },
        ],
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
