<template>
  <Layout>
    <div class="page__header">
      <h1 class="page__title">Products</h1>
      <div class="page__actions">
        <div class="field select">
          <select v-model="selectedBrand">
            <option selected value="">Select a brand</option>
            <template v-for="(brand, index) in brands">
              <option :value="brand.node.name" :key="index">
                {{ brand.node.name }}
              </option>
            </template>
          </select>
        </div>
      </div>
    </div>
    <div class="products container">
      <div class="products__grid row">
        <div
          v-for="product in filteredProducts"
          :key="product.node.id"
          class="product col-4"
        >
          <g-link :to="`/products/${product.node.slug}`">
            <div class="product__preview">
              <g-image
                alt="Product preview"
                width="290"
                height="280"
                v-if="product.node.image"
                :src="product.node.image"
              />
            </div>
            <div class="product__caption">
              <span class="product__name">{{ product.node.name }}</span>
              <span class="product__brand">{{ product.node.brand.name }}</span>
              <span class="product__price">{{ product.node.amount }} €</span>
            </div>
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  products: allProduct(filter: { status: { eq: "publish" } }) {
    edges {
      node {
        id
        name
        slug
        date
        type
        image
        description
        sku
        amount
        color
        brand {
          name 
          slug
        }
      }
    }
  }
  brands: allBrand {
    edges {
      node {
        name
      }
    }
  }
}
</page-query>

<script>
export default {
  data() {
    return {
      brands: [],
      products: [],
      selectedBrand: '',
    };
  },
  created() {
    this.products = this.$page.products.edges;
    this.brands = this.$page.brands.edges;
  },
  mounted() {},
  computed: {
    filteredProducts() {
      if (this.selectedBrand === '') {
        return this.products;
      }
      return this.products.filter(
        product => product.node.brand.name === this.selectedBrand,
      );
    },
  },
  metaInfo: {
    title: 'Products',
  },
};
</script>

<style lang="scss">
.products {
  padding: 0;

  .products__grid {
    margin-left: -12px;
    margin-right: -12px;

    .product {
      padding: 12px;

      > a {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        background-color: #ffffff;
        padding: 16px;
        overflow: hidden;
      }

      .product__preview {
        height: 280px;
        width: 100%;
        overflow: hidden;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
          margin: auto;
          display: block;
        }
      }
      .product__caption {
        margin-top: 32px;

        .product__brand {
          color: $subtitle;
          font-size: 14px;
        }
      }
    }
  }
}
.page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page__actions {
    .field {
      position: relative;
      clear: both;

      select {
        background: #fcfcfc;
        border: 1px solid $inputBorder;
        color: $text;
        margin: 0;
        padding: 16px 24px;
        width: 100%;
        display: block;
        font-size: 14px;
        transition: border-color ease-in-out 0.2s, box-shadow ease-in-out 0.2s;
        text-align: left;
        height: auto;
        -webkit-appearance: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>
