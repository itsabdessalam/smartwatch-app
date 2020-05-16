<template>
  <Layout>
    <div class="product">
      <div class="container">
        <div class="row">
          <div class="product__preview col-7">
            <g-image
              alt="Product preview"
              width="270"
              height="280"
              v-if="$page.product.image"
              :src="$page.product.image"
            />
          </div>
          <div class="product__details col-5">
            <h1 class="product__title">
              {{ $page.product.name }}
            </h1>
            <p class="product__brand">{{ $page.product.brand.name }}</p>
            <p class="product__price">{{ $page.product.amount }} €</p>

            <div class="product__actions">
              <button
                class="product__actions__remove"
                @click.prevent="removeOneFromCart"
              >
                Remove
              </button>
              <button
                class="product__actions__add"
                @click.prevent="addOneToCart"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      quantity: 1,
      product: {},
    };
  },
  created() {
    this.product = this.$page.product;
  },
  mounted() {},
  methods: {
    async addOneToCart() {
      const payload = {
        quantity: this.quantity,
        ...this.product,
      };
      await this.$store.commit("addOneToCart", payload);
    },
    async removeOneFromCart() {
      const payload = {
        ...this.product,
      };
      await this.$store.commit("removeOneFromCart", payload);
    },
  },
  components: {},
  metaInfo() {
    return {
      title: this.$page.product.name,
      meta: [
        {
          name: "description",
          content: this.$page.product.description,
        },
      ],
    };
  },
};
</script>

<page-query>
query Product ($id: ID!) {
    product: product (id: $id) {
        id
        name
        content
        slug
        date
        type
        image
        description
        sku
        amount
        currency
        color
        brand {
          name 
          slug
        }
    }
}
</page-query>

<style lang="scss">
.product {
  .product__preview {
    height: 500px;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      max-width: 290px;
      width: auto;
      margin: auto;
      display: block;
      object-fit: contain;
    }
  }

  .product__details {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    flex-direction: column;

    .product__title {
      margin: 0;
      font-size: 24px;
    }

    .product__brand {
      color: $subtitle;
    }

    .product__actions {
      text-align: right;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      .product__actions__add,
      .product__actions__remove {
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

      .product__actions__add {
        color: #ffffff;
        background-color: $primary;
      }

      .product__actions__remove {
        background-color: #ffffff;
        margin-right: 12px;
      }
    }
  }
}
</style>
