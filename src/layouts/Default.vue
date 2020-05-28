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
import AuthService from '../../services/AuthService';

import Header from '~/components/layout/Header';
import Footer from '~/components/layout/Footer';
import BackToTop from '~/components/elements/BackToTop';

export default {
  data() {
    return {
      deviceWatcher: null,
      device: '',
      user: '',
    };
  },
  async created() {
    await this.checkAuth();
  },
  mounted() {
    this.deviceWatcher = document.getElementById('device');
    this.setDevice();
    window.addEventListener('resize', this.setDevice);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setDevice);
  },
  components: {
    Header,
    Footer,
    BackToTop,
  },
  computed: {
    token() {
      return this.$store.getters.token;
    },
  },
  methods: {
    setDevice() {
      const device = getComputedStyle(
        this.deviceWatcher,
        ':after',
      ).content.replace(/"/g, '');
      if (this.device !== device) {
        this.device = device;
      }
    },
    async checkAuth() {
      try {
        // eslint-disable-next-line no-unused-vars
        const { data } = await AuthService.ping(this.token);
      } catch (error) {
        this.handleError(error);
      }
    },
    handleError(error) {
      if (error && error.response && error.response.status === 401) {
        if (this.token) {
          this.$store.dispatch('logout');
          if (
            this.$route.path !== '/login' &&
            this.$route.path === '/account'
          ) {
            this.$router.push('/login');
          }
        }
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
    min-height: calc(100vh - 280px);
    padding: 72px 0;
  }
}
</style>
