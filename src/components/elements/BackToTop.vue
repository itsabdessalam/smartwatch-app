<template>
  <a
    class="backtotop"
    :class="visible && 'visible'"
    @click.prevent="handleClick"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5"></line>
      <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
  </a>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleClick() {
      window.scrollTo(0, 0);
    },
    handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (!this.visible && scrollTop > 500) {
        this.visible = true;
      }
      if (this.visible && scrollTop <= 500) {
        this.visible = false;
      }
    },
  },
};
</script>

<style lang="scss">
.backtotop {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 48px;
  height: 48px;
  color: #ffffff;
  background: $text;
  cursor: pointer;
  transform: translateY(250px);
  transition: 0.5s transform ease-out;

  &.visible {
    transform: translateY(0);
  }

  &:focus {
    outline: 0;
  }
}
</style>
