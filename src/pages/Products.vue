<template>
  <Layout>
    <div class="page__header">
      <h1 class="page__title">Products</h1>
      <div class="page__actions">
        <div class="field select brand-filter">
          <select v-model="selectedBrand">
            <option selected value="">Select a brand</option>
            <template v-for="(brand, index) in brands">
              <option :value="brand.name" :key="index">
                {{ brand.name }}
              </option>
            </template>
          </select>
        </div>
        <div class="price-filter">
          <span>Price</span>
          <a
            title="Sort desc"
            class="sort-desc"
            :class="{ selected: sortOrder === 'desc' }"
            @click.prevent="sort('desc')"
          >
            <svg viewBox="0 0 16.1 11.3">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1 5.7l-1.5-1.5L10.4 0 9 1.4l3.2 3.2H0v2h12.3L9 9.9l1.4 1.4 4.2-4.2z"
              ></path>
            </svg>
          </a>
          <a
            title="Sort asc"
            class="sort-asc"
            :class="{ selected: sortOrder === 'asc' }"
            @click.prevent="sort('asc')"
          >
            <svg viewBox="0 0 16.1 11.3">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.1 5.7l-1.5-1.5L10.4 0 9 1.4l3.2 3.2H0v2h12.3L9 9.9l1.4 1.4 4.2-4.2z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="products container">
      <div class="products__grid row">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product col-4"
        >
          <g-link :to="`/products/${product.slug}`">
            <div class="product__preview">
              <g-image
                alt="Product preview"
                width="290"
                height="280"
                v-if="product.image"
                :src="product.image"
              />
            </div>
            <div class="product__caption">
              <span class="product__name">{{ product.name }}</span>
              <span class="product__brand">{{ product.brand.name }}</span>
              <span class="product__price">{{ product.amount }} €</span>
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
import { sortByField } from '../../utils/array';

export default {
  metaInfo: {
    title: 'Products',
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  data() {
    return {
      brands: [],
      products: [],
      selectedBrand: '',
      sortOrder: '',
    };
  },
  created() {
    if (this.$page) {
      this.products = this.$page.products.edges.map(edge => edge.node);
      this.brands = this.$page.brands.edges.map(edge => edge.node);
    }
  },
  mounted() {},
  computed: {
    filteredProducts() {
      const products =
        this.sortOrder === ''
          ? this.products
          : sortByField(this.products, 'amount', this.sortOrder);

      if (this.selectedBrand === '') {
        return products;
      }

      return products.filter(
        product => product.brand.name === this.selectedBrand,
      );
    },
  },
  methods: {
    sort(order) {
      if (this.sortOrder === order) {
        this.sortOrder = '';
      } else {
        this.sortOrder = order;
      }
    },
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
    display: flex;

    .field {
      position: relative;
      clear: both;

      &.select {
        select {
          background: #ffffff;
          border: 1px solid $inputBorder;
          color: $text;
          margin: 0;
          padding: 16px 48px 16px 16px;
          width: 100%;
          display: block;
          font-size: 14px;
          transition: border-color ease-out 0.2s, box-shadow ease-out 0.2s;
          text-align: left;
          height: auto;
          position: relative;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
        }

        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItY2hldnJvbi1kb3duIj4KICAgIDxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ii8+Cjwvc3ZnPgo=');
          background-size: 16px;
          background-repeat: no-repeat;
          height: 16px;
          width: 16px;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
      }
    }

    .price-filter {
      display: flex;
      margin-left: 12px;
      background-color: #ffffff;
      border: 1px solid $inputBorder;
      font-size: 14px;

      > span {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 12px;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 52px;
        height: 100%;
        color: #ffffff;
        cursor: pointer;
        transition: all ease-out 0.2s;

        > svg {
          width: 12px;
        }

        &.sort-desc {
          border-left: 1px solid $inputBorder;
          border-right: 1px solid $inputBorder;

          > svg {
            transform: rotate(90deg);
          }
        }

        &.sort-asc {
          > svg {
            transform: rotate(-90deg);
          }
        }

        &.selected {
          background-color: $background;
        }
      }
    }
  }
}
</style>
