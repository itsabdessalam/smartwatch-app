<template>
  <div class="slider">
    <div class="slider__items">
      <slot />
    </div>
    <div class="slider__controls">
      <div class="slider__controls__prev">
        <a @click="previous" title="Go to previous slide">
          <svg viewBox="0 0 16.1 11.3">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.1 5.7l-1.5-1.5L10.4 0 9 1.4l3.2 3.2H0v2h12.3L9 9.9l1.4 1.4 4.2-4.2z"
            ></path>
          </svg>
        </a>
      </div>
      <div class="slider__controls__next">
        <a @click="next" title="Go to next slide">
          <svg viewBox="0 0 16.1 11.3">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.1 5.7l-1.5-1.5L10.4 0 9 1.4l3.2 3.2H0v2h12.3L9 9.9l1.4 1.4 4.2-4.2z"
            ></path>
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
    width: 108;
    bottom: -16px;
    right: 36px;
    display: flex;
    align-items: center;
    justify-content: center;

    .slider__controls__prev,
    .slider__controls__next {
      width: 48px;
      height: 48px;
      background-color: #000000;

      > a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          fill: #ffffff;
          width: 16px;
        }
      }
    }

    .slider__controls__prev {
      margin-right: 12px;
      > a {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
