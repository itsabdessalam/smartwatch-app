<template>
  <Layout>
    <ClientOnly>
      <Loader v-if="isLoading" class="loader--full" />
      <div v-else-if="!isLoading && !error">
        <div class="page__header">
          <h1 class="page__title">Account</h1>
          <div class="page__actions">
            <Button class="button--primary submit" @click.prevent="logout">
              Logout
            </Button>
          </div>
        </div>
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
          <div v-if="orders.length">
            <div v-for="order in orders" :key="order.id" class="user__order">
              <div class="user__order__details row">
                <div class="user__order__details__item col-3">
                  <span class="item__title">Order</span>
                  <span>{{ order.id }}</span>
                </div>
                <div class="user__order__details__item col-3">
                  <span class="item__title">Order date</span>
                  <span>{{ order.createdAt | toLocaleDate }}</span>
                </div>
                <div class="user__order__details__item col-3">
                  <span class="item__title">Status</span>
                  <span>{{ order.status }}</span>
                </div>
                <div class="user__order__details__item col-3">
                  <span class="item__title">Total</span>
                  <span>{{ parseFloat(order.total / 100).toFixed(2) }} €</span>
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
                      <g-image
                        v-if="getProductImage(product.sku)"
                        :src="`${getProductImage(product.sku)}`"
                        width="60"
                      />
                      <span>{{ product.name.substring(0, 5) }}...</span>
                    </g-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="user__orders__status">No order yet</div>
        </div>
      </div>
      <div v-else>{{ error }}</div>
    </ClientOnly>
  </Layout>
</template>

<page-query>
query {
  products: allProduct(filter: { status: { eq: "publish" } }) {
    edges {
      node {
        sku
        image
      }
    }
  }
}
</page-query>

<script>
import UserService from '../../services/UserService';

import Loader from '~/components/elements/Loader';
import Button from '~/components/elements/Button';

export default {
  metaInfo: {
    title: 'Account',
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  data() {
    return {
      isLoading: false,
      error: '',
      orders: [],
      products: [],
    };
  },
  created() {
    if (this.$page) {
      this.products = this.$page.products.edges.map(edge => edge.node);
    }
  },
  components: {
    Loader,
    Button,
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

        if (!data) {
          throw new Error('No data was retrieved.');
        }

        const { orders } = data.data || { orders: [] };

        this.orders = orders;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    getProductImage(sku) {
      const found = this.products.filter(product => product.sku === sku)[0];
      return (found && found.image) || null;
    },
    logout() {
      this.$store.dispatch('logout');
      if (this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    },
  },
};
</script>
<style lang="scss">
.page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page__actions {
    display: flex;
  }
}
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

.user__orders__status {
  background-color: #ffffff;
  padding: 48px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
