<template>
  <Layout>
    <div class="product-title">
      <h1 class="product-title__text">
        {{ $page.product.title }}
      </h1>
    </div>

    <div class="product content-box">
      <div class="product__header">
        <g-image
          alt="Cover image"
          v-if="$page.product.customFields.image"
          :src="$page.product.customFields.image"
        />
      </div>

      <div class="product__content" v-html="$page.product.content" />

      <div class="product__footer"></div>
    </div>

    <div class="product-comments"></div>
  </Layout>
</template>

<script>
export default {
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
        customFields {
            image
        }
    }
}
</page-query>

<style></style>
