<template>
  <Layout>
    <h1>
      Cart
    </h1>
    <button @click="redirectToCheckout" :disabled="cartCount === 0">
      Buy me
    </button>
    <button @click="clearCart" :disabled="cartCount < 1">Clear cart</button>
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
      const { error } = await this.stripe.redirectToCheckout({
        items: [...this.cart],
        customerEmail: "hello@abdessalam.dev",
        successUrl: `http://localhost:8080/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `http://localhost:8080/cart?session_id={CHECKOUT_SESSION_ID}`,
      });
      if (error) {
        console.warn("Error:", error);
      }
    },
    async clearCart() {
      await this.$store.commit("clearCart");
    },
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
};
</script>
