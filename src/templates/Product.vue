<template>
  <Layout>
    <div class="product-title">
      <h1 class="product-title__text">
        {{ $page.product.title }}
      </h1>
    </div>

    <div class="product content-box">
      <div class="product__preview">
        <g-image
          alt="Product preview"
          width="270"
          height="275"
          v-if="$page.product.image"
          :src="$page.product.image"
        />
      </div>

      <div class="product__content" v-html="$page.product.content" />

      <button class="add" @click.prevent="addToCart">Add</button>

      <div class="product__footer"></div>
    </div>

    <div class="product-comments"></div>
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
    async addToCart() {
      const payload = {
        quantity: this.quantity,
        sku: this.product.sku,
      };
      await this.$store.commit("addToCart", payload);
    },
  },
  components: {},
  metaInfo() {
    return {
      title: this.$page.product.title,
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
        title
        content
        slug
        date
        type
        image
        description
        sku
        price
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
    width: 270px;
    height: 275px;
    overflow: hidden;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 90%;
      width: auto;
      margin: auto;
      display: block;
    }
  }

  button {
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
    color: #ffffff;
    background-color: $primary;
    border: 2px solid $primary;
  }
}
</style>
