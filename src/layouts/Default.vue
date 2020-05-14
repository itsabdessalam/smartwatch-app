<template>
  <div class="layout">
    <Header />
    <main class="content">
      <slot />
    </main>
    <Footer />
    <BackToTop />
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import BackToTop from "~/components/elements/BackToTop";

export default {
  components: {
    Header,
    Footer,
    BackToTop,
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

@media (max-width: $phone) {
  .layout {
    .content {
      padding: 0;
    }
  }
}
</style>
