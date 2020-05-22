<template>
  <Layout>
    <h1>Checkout success!</h1>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Checkout success!',
  },
  mounted() {
    this.$store.dispatch('emptyCart');
  },
};
</script>
