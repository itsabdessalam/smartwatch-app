<template>
  <Layout>
    <h1>
      Cart
    </h1>
    <div class="cart">
      <table v-if="cartCount > 0" class="cart__items table">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in cart" :key="product.id">
            <td>
              <g-image
                v-if="product.image"
                :src="product.image"
                :alt="product.title"
              />
            </td>
            <td>{{ product.title }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.price * product.quantity }} €</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        Your cart is empty
      </div>
      <div class="cart__total">
        <span>Cart Total: {{ cartTotal }} €</span>
      </div>

      <div class="cart__actions">
        <button
          @click="redirectToCheckout"
          :disabled="cartCount === 0"
          class="cart__actions__checkout"
        >
          Checkout
        </button>
        <button
          @click="clearCart"
          :disabled="cartCount < 1"
          class="cart__actions__clear"
        >
          Clear cart
        </button>
      </div>
    </div>
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
        items: [
          ...this.cart.map((item) => ({
            quantity: item.quantity,
            sku: item.sku,
          })),
        ],
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
    cartTotal() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style lang="scss">
.cart {
  .cart__items {
    img {
      width: 72px;
      height: 96px;
      object-fit: contain;
    }
  }
  .cart__total {
    text-align: right;
    margin-top: 32px;
  }
}
</style>
