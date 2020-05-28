<template>
  <Layout>
    <section class="section" data-section="hero">
      <Slider ref="slider">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="slide"
        >
          <div class="container">
            <div class="slide__content row">
              <div class="slide__content__item--left col-7">
                <h2 class="slide__content__title">
                  Discover our latest products
                </h2>
                <div class="slide__content__inner">
                  <span class="slide__title"> {{ product.name }}</span>
                  <span class="slide__subtitle">{{ product.brand.name }}</span>
                  <g-link
                    :to="`/products/${product.slug}`"
                    class="slide__cta"
                    title="View product"
                  >
                    Shop
                  </g-link>
                </div>
              </div>
              <div class="slide__content__item--right col-5">
                <g-image
                  alt="Product preview"
                  v-if="product.image"
                  :src="product.image"
                />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
    <section class="section" data-section="products">
      <div class="section__header">
        <h2 class="section__title">
          Products
        </h2>
        <g-link :to="`/products`" title="View all products">
          View all
        </g-link>
      </div>
      <div class="section__content">
        <div class="products container">
          <div class="products__grid row">
            <div
              v-for="product in products"
              :key="product.id"
              class="product col-4"
            >
              <g-link
                :to="`/products/${product.slug}`"
                :title="`View ${product.name}`"
              >
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
                  <span class="product__name"> {{ product.name }}</span>
                  <span class="product__brand">
                    {{ product.brand.name }}
                  </span>
                  <span class="product__price">{{ product.amount }} €</span>
                </div>
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" data-section="news">
      <div class="section__header">
        <h2 class="section__title">
          News
        </h2>
        <g-link :to="`/news`" title="View all news">
          View all
        </g-link>
      </div>
      <div class="section__content">
        <div class="posts container">
          <div class="posts__grid row">
            <div v-for="post in posts" :key="post.id" class="post col-4">
              <g-link :to="`/posts/${post.slug}`" :title="`View ${post.title}`">
                <span class="post__title">{{ post.title }}</span>
                <span class="post__date">
                  {{ post.date | toLocaleDate }}
                </span>
              </g-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section" data-section="newsletter">
      <NewsletterForm />
    </section>
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
        currency
        color
        brand {
          name 
          slug
        }
      }
    }
  }
  posts: allPost(filter: { status: { eq: "publish" } }, limit: 3) {
    edges {
      node {
        id
        title
        content
        slug
        date
        type
        image
      }
    }
  }
}
</page-query>

<script>
import Slider from '~/components/elements/Slider';
import NewsletterForm from '~/components/elements/NewsletterForm';
import { shuffle } from '../../utils/array';

export default {
  metaInfo: {
    title: 'Home',
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  data() {
    return {
      featuredProducts: [],
      products: [],
      posts: [],
    };
  },
  components: {
    Slider,
    NewsletterForm,
  },
  created() {
    if (this.$page) {
      const products = this.$page.products.edges.map(edge => edge.node);
      this.featuredProducts = products.slice(0, 6);
      this.products = shuffle(products).slice(0, 3);
      this.posts = this.$page.posts.edges.map(edge => edge.node).slice(0, 3);
    }
  },
};
</script>

<style lang="scss">
.slider {
  .slide {
    .slide__content {
      height: 100%;

      .slide__content__item--left {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding: 48px;
      }

      .slide__content__item--right {
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
        color: $subtitle;
      }

      .slide__cta {
        margin-top: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease-out 0.2s;
        background-color: transparent;
        font-size: 14px;
        min-width: 100px;
        padding: 16px 24px;
        min-width: 128px;
        border: none;
        cursor: pointer;
        transition: all ease-out 0.2s;
        color: #ffffff;
        background-color: $primary;
      }

      .slide__content__title {
        font-size: 48px;
        margin-bottom: 54px;
      }

      .slide__content__inner {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
}

.section__header {
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

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

.posts {
  .posts__grid {
    margin-left: -12px;
    margin-right: -12px;

    .post {
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

      .post__title {
        font-size: 22px;
        margin-bottom: 12px;
      }

      .post__date {
        font-size: 14px;
        color: $subtitle;
      }
    }
  }
}
</style>
