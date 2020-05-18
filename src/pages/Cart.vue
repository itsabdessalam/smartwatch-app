<template>
  <Layout>
    <ClientOnly>
      <h1>
        Cart
      </h1>
      <Alert
        v-show="cartCount > 0 && !isAuthenticated"
        type="warning"
        :message="'You must be logged in to procced to checkout'"
      />
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
          <Button @click="emptyCart" class="cart__actions__clear">
            Empty cart
          </Button>
          <Button
            @click="handleCheckout"
            class="cart__actions__checkout"
            :disabled="!isAuthenticated"
          >
            Checkout
          </Button>
        </div>
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import StripeService from '../../services/StripeService';

const STRIPE_PUBLIC_KEY = process.env.GRIDSOME_STRIPE_PUBLIC_KEY;

import Button from '~/components/elements/Button';
import Alert from '~/components/elements/Alert';

export default {
  metaInfo: {
    title: 'Cart',
  },
  data() {
    return {
      stripe: null,
    };
  },
  components: {
    Button,
    Alert,
  },
  async mounted() {
    const stripePromise = await loadStripe(STRIPE_PUBLIC_KEY);
    this.stripe = await stripePromise;
  },
  methods: {
    async emptyCart() {
      await this.$store.dispatch('emptyCart');
    },
    async handleCheckout() {
      const items = this.cart.map(item => {
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
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
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
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

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
