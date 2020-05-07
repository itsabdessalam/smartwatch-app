<template>
  <Layout>
    <section class="hero">
      <Slider ref="slider">
        <div class="slide">Item 1</div>
        <div class="slide">Item 2</div>
        <div class="slide">Item 3</div>
        <div class="slide">Item 4</div>
      </Slider>
    </section>
    <section>
      Ici produits
    </section>
    <section>Ici posts</section>
    <section class="contact-us">Ici newsletter</section>
  </Layout>
</template>

<page-query>
query {
  products: allProduct(filter: { status: { eq: "publish" } }, limit: 3) {
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
