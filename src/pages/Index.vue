<template>
  <Layout>
    <section class="hero">Ici carousel</section>
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
export default {
  components: {},
  metaInfo: {
    title: "Home",
  },
};
</script>
