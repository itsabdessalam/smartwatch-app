<template>
  <div class="loader">
    <div class="loader__inner" :style="style"></div>
  </div>
</template>
<script>
export default {
  name: 'Loader',
  props: {
    color: {
      type: String,
      default: '#000000',
    },
    width: {
      type: String,
      default: '19',
    },
    height: {
      type: String,
      default: '19',
    },
  },
  computed: {
    style() {
      return `width:${this.width}px;height:${this.height}px;border-left-color:${this.color};`;
    },
  },
};
</script>

<style lang="scss">
.loader {
  display: flex;
  &--full {
    height: calc(100% - 10vh);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loader__inner {
    display: inline-block;
    border: 2px solid rgba(113, 129, 147, 0.175);
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
  }
}
</style>
