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
            <th>Amount</th>
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
                :alt="product.name"
              />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.quantity }}</td>
            <td>{{ product.amount }} €</td>
            <td>{{ product.amount * product.quantity }} €</td>
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
      <div v-if="cartCount > 0" class="cart__actions">
        <button @click="clearCart" class="cart__actions__clear">
          Clear cart
        </button>
        <button @click="handleCheckout" class="cart__actions__checkout">
          Checkout
        </button>
      </div>
    </div>
  </Layout>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { STRIPE_PUBLIC_KEY } from "../../config";
import StripeService from "../../services/StripeService";

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
  beforeDestroy() {
    this.clearStripe();
  },
  methods: {
    getStripeControllerFrameNode() {
      const frameId =
        this.stripe && this.stripe._controller && this.stripe._controller._id;
      if (!frameId) return;

      return document.querySelector(`[name='${frameId}']`);
    },

    removeStripeControllerFrame() {
      const frameNode = this.getStripeControllerFrameNode(this.stripe);

      if (frameNode && frameNode.parentNode) {
        frameNode.parentNode.removeChild(frameNode);
      }
    },
    clearStripe() {
      let id = window.setTimeout(() => {}, 0);
      while (id--) {
        window.clearTimeout(id);
      }

      this.stripe._controller._controllerFrame._removeAllListeners();
      this.stripe._controller._controllerFrame._iframe.remove();

      const stripeIframes = [
        document.querySelectorAll("[name^=__privateStripeMetricsController]"),
        document.querySelectorAll("[name^=__privateStripeController]"),
      ];

      stripeIframes.forEach((iframes) =>
        iframes.forEach((iframe) => {
          iframe.parentNode.removeChild(iframe);
        })
      );

      this.removeStripeControllerFrame();
    },
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
    async handleCheckout() {
      const items = this.cart.map((item) => {
        return {
          name: item.name,
          description: item.name,
          images: [item.image],
          amount: item.amount * 100,
          currency: item.currency,
          quantity:
            item.quantity > 0 && item.quantity <= 10 ? item.quantity : 1,
        };
      });

      const response = await StripeService.createCheckout({
        items,
        customerEmail: this.user.email,
        clientReferenceId: this.user.id,
      });

      const { error } = await this.stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (error) {
        console.error(error);
      }
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
    user() {
      return this.$store.getters.user;
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

  .cart__actions {
    text-align: right;
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cart__actions__checkout,
    .cart__actions__clear {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-out 0.2s;
      background-color: transparent;
      font-size: 14px;
      min-width: 100px;
      padding: 12px 24px;
      border: none;
      cursor: pointer;
      transition: all ease-out 0.2s;
    }

    .cart__actions__checkout {
      color: #ffffff;
      background-color: $primary;
    }

    .cart__actions__clear {
      background-color: #ffffff;
      margin-right: 12px;
    }
  }
}
</style>
