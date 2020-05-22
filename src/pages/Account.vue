<template>
  <Layout>
    <ClientOnly>
      <h1>Account</h1>
      <Loader v-if="isLoading" class="loader--full" />
      <div v-else>
        <div class="user__account">
          <h2>Personal informations</h2>
          <ul class="user__account__details">
            <li class="user__account__details__item">
              <span class="item__title">Name</span>
              <span>{{ user.name }}</span>
            </li>
            <li class="user__account__details__item">
              <span class="item__title">Email</span>
              <span>{{ user.email }}</span>
            </li>
            <li class="user__account__details__item">
              <span class="item__title">Account created on</span>
              <span>{{ user.createdAt | toLocaleDate }}</span>
            </li>
            <li class="user__account__details__item">
              <span class="item__title">Last connection time</span>
              <span>{{ user.lastTimeConnectedAt | toLocaleDate }}</span>
            </li>
          </ul>
        </div>
        <div class="user__orders">
          <h2>Orders</h2>
          <div v-for="order in orders" :key="order._id" class="user__order">
            <div class="user__order__details row">
              <div class="user__order__details__item col-4">
                <span class="item__title">Order</span>
                <span>{{ order._id }}</span>
              </div>
              <div class="user__order__details__item col-4">
                <span class="item__title">Shipping date</span>
                <span>{{ order.createdAt | toLocaleDate }}</span>
              </div>
              <div class="user__order__details__item col-4">
                <span class="item__title">Status</span>
                <span> {{ order.status }}</span>
              </div>
            </div>
            <div class="user__order__products">
              <span class="item__title">Products</span>
              <ul>
                <li
                  v-for="product in order.products"
                  :key="product.id"
                  class="user__order__product col-1"
                >
                  <g-link :to="`/products/${product.slug}`">
                    <g-image :src="`${product.custom.images[0]}`" width="60" />
                    <span>{{ product.name.substring(0, 5) }}...</span>
                  </g-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import UserService from '../../services/UserService';
// import { isValidEmail } from '../../../utils/validator';
// import { size } from '../../../utils/common';

// import Button from '~/components/elements/Button';
import Loader from '~/components/elements/Loader';

export default {
  metaInfo: {
    title: 'Account',
  },
  data() {
    return {
      isLoading: false,
      error: '',
      orders: [],
    };
  },
  components: {
    Loader,
  },
  async mounted() {
    await this.getUserOrders();
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    async getUserOrders() {
      this.isLoading = true;
      try {
        const { data } = await UserService.getUserOrders(
          this.user.id,
          this.token,
        );
        this.orders = data.data.orders;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
<style lang="scss">
.item__title {
  font-size: 14px;
  color: $subtitle;
}

.user__account {
  .user__account__details {
    padding: 16px;
    background-color: #ffffff;

    .user__account__details__item {
      &:not(:first-of-type) {
        margin-top: 12px;
      }
    }
  }
}
.user__orders {
  .user__order {
    padding: 16px;
    background-color: #ffffff;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    .user__order__details__item {
      padding: 0;
      &:not(:first-of-type) {
        margin-top: 12px;
      }
    }

    .user__order__products {
      display: flex;
      flex-direction: column;
      margin-top: 16px;

      .user__order__product {
        margin-top: 12px;

        img {
          height: 100px;
          object-fit: contain;
          width: 60px;
        }
      }
    }
  }
}
</style>
