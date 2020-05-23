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
              <th>Amount</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in cart" :key="product.id" class="cart__item">
              <td>
                <g-link :to="`/products/${product.slug}`">
                  <g-image
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                  />
                </g-link>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.amount }} €</td>
              <td>
                <div class="cart__item__actions">
                  <Button
                    @click="removeOneFromCart(product.sku)"
                    class="cart__item__actions__remove"
                  >
                    -
                  </Button>
                  <span class="cart__item__quantity">
                    {{ product.quantity }}
                  </span>
                  <Button
                    @click="addOneToCart(product.sku)"
                    class="cart__item__actions__add"
                  >
                    +
                  </Button>
                </div>
              </td>
              <td>
                {{ parseFloat(product.amount * product.quantity).toFixed(2) }}
                €
              </td>

              <td>
                <Button
                  @click.prevent="removeFromCart(product.sku)"
                  class="cart__item__remove"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="cart__status">
          Your cart is empty
        </div>
        <div v-if="cartCount > 0">
          <div class="cart__total">
            <span>Cart Total: {{ cartTotal }} €</span>
          </div>
          <div class="cart__actions">
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
    async addOneToCart(sku) {
      const item = this.cart.find(i => i.sku === sku);
      const payload = {
        quantity: 1,
        ...item,
      };
      await this.$store.dispatch('addOneToCart', payload);
    },
    async removeOneFromCart(sku) {
      await this.$store.dispatch('removeOneFromCart', sku);
    },
    async removeFromCart(sku) {
      await this.$store.dispatch('removeFromCart', sku);
    },
    async emptyCart() {
      await this.$store.dispatch('emptyCart');
    },
    async handleCheckout() {
      const items = this.cart.map(item => {
        return {
          name: item.name,
          description: item.name,
          sku: item.sku,
          slug: item.slug,
          images: [item.image],
          amount: parseFloat(item.amount).toFixed(2) * 100,
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

  .cart__status {
    background-color: #ffffff;
    padding: 48px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .cart__item {
    .cart__item__actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      max-width: 128px;

      .cart__item__actions__remove,
      .cart__item__actions__add {
        display: block;
        width: 24px;
        height: 24px;
        padding: 0;
        max-width: 24px !important;
        min-width: 24px !important;
        color: #ffffff;
        background-color: $primary;
      }
    }
    .cart__item__quantity {
      width: 32px;
      height: 24px;
      text-align: center;
    }

    .cart__item__remove {
      width: 24px;
      height: 24px;
      padding: 0;
      max-width: 24px !important;
      min-width: 24px !important;
      margin: 0 auto;

      svg {
        fill: currentColor;
        width: 18px;
      }
    }
  }
}
</style>
