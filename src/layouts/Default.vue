<template>
  <div class="layout">
    <Header />
    <main class="content">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
.layout {
  max-width: 1190px;
  margin: 0 auto;
  padding: 0 12px;

  .content {
    padding: 75px 0;
  }
}
</style>
