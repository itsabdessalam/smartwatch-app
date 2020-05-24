<template>
  <Layout>
    <h1>Checkout success!</h1>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Checkout success!',
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  mounted() {
    this.$store.dispatch('emptyCart');
  },
};
</script>
