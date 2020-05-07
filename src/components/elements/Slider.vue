<template>
  <div class="slider">
    <div class="slider__items">
      <slot />
    </div>
    <div class="slider__controls">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      position: 0,
      intervalId: null,
    };
  },
  mounted() {
    const slides = [].slice.call(this.$el.querySelectorAll(".slide"));
    this.callTest(slides);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  methods: {
    callTest(slides) {
      const first = slides[0];
      first.classList.add("active");

      this.intervalId = setInterval(() => {
        const active = this.$el.querySelector(".active");
        active.classList.remove("active");

        if (active.nextSibling) {
          active.nextSibling.classList.add("active");
        } else {
          first.classList.add("active");
        }

        console.log("toto");
      }, 6000);
    },
  },
};
</script>

<style lang="scss">
.slider {
  height: 500px;
  background-color: #ffffff;

  .slider__items {
    .slide {
      display: none;

      &.active {
        display: flex;
      }
    }
  }
}
</style>
