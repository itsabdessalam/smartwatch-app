<template>
  <Layout>
    <h1 class="page__title">Products</h1>
    <div class="products container">
      <div class="products__grid row">
        <div
          v-for="edge in $page.products.edges"
          :key="edge.node.id"
          class="product col-4"
        >
          <g-link :to="`/products/${edge.node.slug}`">
            <div class="product__preview">
              <g-image
                alt="Product preview"
                width="270"
                height="280"
                v-if="edge.node.image"
                :src="edge.node.image"
              />
            </div>
            <div class="product__caption">
              <span class="product__name">{{ edge.node.name }}</span>
              <span class="product__brand">{{ edge.node.brand.name }}</span>
              <span class="product__price">{{ edge.node.amount }} €</span>
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
        content
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
}
</page-query>

<script>
export default {
  components: {},
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
        padding: 20px;
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
</style>
