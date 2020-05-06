<template>
  <Layout>
    <section class="header">Ici carousel</section>
    <section class="products">
      Ici produits

      <div v-for="edge in $page.products.edges" :key="edge.node.id">
        <g-link :to="`/products/${edge.node.slug}`">{{
          edge.node.title
        }}</g-link>
      </div>
    </section>
    <section class="posts">Ici posts</section>
    <section class="contact-us">Ici newsletter</section>
  </Layout>
</template>

<page-query>
query {
  products: allProduct(filter: { status: { eq: "publish" }}) {
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
    title: "Hello, world!",
  },
};
</script>
