<template>
  <div class="layout" :data-device="device">
    <Header />
    <main class="content">
      <slot />
    </main>
    <Footer />
    <BackToTop />
    <span id="device" class="screen-only"></span>
  </div>
</template>

<script>
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import BackToTop from "~/components/elements/BackToTop";

export default {
  data() {
    return {
      deviceWatcher: null,
      device: "",
    };
  },
  mounted() {
    this.deviceWatcher = document.getElementById("device");
    this.setDevice();
    window.addEventListener("resize", this.setDevice);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setDevice);
  },
  components: {
    Header,
    Footer,
    BackToTop,
  },
  methods: {
    setDevice(element, event) {
      const device = getComputedStyle(
        this.deviceWatcher,
        ":after"
      ).content.replace(/"/g, "");
      if (this.device !== device) {
        this.device = device;
      }
    },
  },
};
</script>
<style lang="scss">
.layout {
  max-width: 1190px;
  margin: 0 auto;
  padding: 0 12px;

  .content {
    min-height: calc(100vh - 245px);
    padding: 75px 0;
  }
}
</style>
