<template>
  <Layout>
    <section class="hero">
      <Slider ref="slider">
        <div
          v-for="edge in $page.products.edges"
          :key="edge.node.id"
          class="slide"
        >
          <div class="container">
            <div class="slide__content row">
              <div class="slide__content__left col-7">
                <h2 class="slide__content__title">
                  Discover our latest products
                </h2>
                <div class="slide__content__inner">
                  <span class="slide__title"> {{ edge.node.title }}</span>
                  <span class="slide__subtitle">{{
                    edge.node.customFields.brand.post_title
                  }}</span>
                  <g-link
                    :to="`/products/${edge.node.slug}`"
                    class="slide__cta"
                  >
                    Shop
                  </g-link>
                </div>
              </div>
              <div class="slide__content__right col-5">
                <g-image
                  alt="Product preview"
                  v-if="edge.node.customFields.image"
                  :src="edge.node.customFields.image"
                />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
    <section>Products</section>
    <section>News</section>
    <section>Newsletter</section>
  </Layout>
</template>

<page-query>
query {
  products: allProduct(filter: { status: { eq: "publish" } }, limit: 6) {
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
  posts: allProduct(filter: { status: { eq: "publish" } }, limit: 3) {
    edges {
      node {
        id
        title
        content
        slug
        date
        type
      }
    }
  }
}
</page-query>

<script>
import Slider from "~/components/elements/Slider";

export default {
  components: {
    Slider,
  },
  metaInfo: {
    title: "Home",
  },
};
</script>

<style lang="scss">
.slide {
  .slide__content {
    height: 100%;

    .slide__content__left {
      display: flex;
      align-items: flex-start;
      justify-content: flex-end;
      flex-direction: column;
      padding: 80px 48px;
    }

    .slide__content__right {
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        max-width: 290px;
      }
    }

    .slide__title {
      font-size: 20px;
      font-weight: 600;
    }

    .slide__subtitle {
      color: var(--subtitle);
    }

    .slide__cta {
      margin-top: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all ease-out 0.2s;
      background-color: transparent;
      font-size: 14px;
      min-width: 120px;
      padding: 12px 24px;
      border: none;
      cursor: pointer;
      transition: all ease-out 0.2s;
      color: #ffffff;
      background-color: var(--primary);
    }

    .slide__content__title {
      font-size: 48px;
      margin-bottom: 48px;
    }

    .slide__content__inner {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
    }
  }
}
</style>
