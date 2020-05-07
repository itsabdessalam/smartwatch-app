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
                height="275"
                v-if="edge.node.customFields.image"
                :src="edge.node.customFields.image"
              />
            </div>
            <div class="product__caption">
              <span class="product__name"> {{ edge.node.title }}</span>
              <span class="product__brand">
                {{ edge.node.customFields.brand.post_title }}</span
              >
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
        title
        content
        slug
        date
        type
        customFields {
          color
          brand {
            post_title
          }
          image
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
    title: "Products",
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
        height: 275px;
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
          color: var(--subtitle);
          font-size: 14px;
        }
      }
    }
  }
}
</style>
