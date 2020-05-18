<template>
  <div class="slider">
    <div class="slider__items">
      <slot />
    </div>
    <div class="slider__controls">
      <div class="slider__controls__prev">
        <a @click="previous" title="Go to previous slide">
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </a>
      </div>
      <div class="slider__controls__next">
        <a @click="next" title="Go to next slide">
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
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      slides: [],
      intervalId: null,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clear();
  },
  methods: {
    init() {
      this.slides = [].slice.call(this.$el.querySelectorAll('.slide'));
      this.slides[0].classList.add('active');

      this.intervalId = setInterval(() => {
        const active = this.$el.querySelector('.active');

        active.classList.remove('active');

        if (active.nextSibling) {
          active.nextSibling.classList.add('active');
        } else {
          this.slides[0].classList.add('active');
        }
      }, 6000);
    },
    next() {
      const active = this.$el.querySelector('.active');

      active.classList.remove('active');

      if (active.nextSibling) {
        active.nextSibling.classList.add('active');
      } else {
        this.slides[0].classList.add('active');
      }
    },
    previous() {
      const active = this.$el.querySelector('.active');

      active.classList.remove('active');

      if (active.previousSibling) {
        active.previousSibling.classList.add('active');
      } else {
        this.slides[this.slides.length - 1].classList.add('active');
      }
    },
    clear() {
      clearInterval(this.intervalId);
    },
  },
};
</script>

<style lang="scss">
.slider {
  height: 500px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;

  .slider__items {
    height: 100%;
    .slide {
      height: 100%;
      width: 100%;

      animation: fadeIn 1s ease;

      &:not(.active) {
        display: none;
      }
    }
  }

  .slider__controls {
    position: absolute;
    width: 96px;
    bottom: 12px;
    right: 36px;
    display: flex;
    align-items: center;
    justify-content: center;

    .slider__controls__prev,
    .slider__controls__next {
      width: 48px;
      height: 48px;

      > a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
</style>
