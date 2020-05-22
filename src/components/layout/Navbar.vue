<template>
  <nav class="nav">
    <div class="nav__links nav__links--desktop">
      <Logo />
      <div class="nav__links__inner">
        <g-link class="nav__link" to="/" title="Home">Home</g-link>
        <g-link class="nav__link" to="/products" title="Products">
          Products
        </g-link>
        <g-link class="nav__link" to="/about" title="About">About</g-link>
        <g-link class="nav__link" to="/news" title="News">News</g-link>
        <g-link class="nav__link" to="/contact" title="Contact">Contact</g-link>
        <div class="nav__link__icons">
          <g-link class="nav__link nav__link--icon" to="/login" title="Login">
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
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </g-link>
          <g-link class="nav__link nav__link--icon" to="/cart" title="Cart">
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
              <path
                d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"
              ></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span v-if="cartCount >= 1" class="nav__link__cart__count">
              {{ cartCount }}
            </span>
          </g-link>
        </div>
      </div>
    </div>

    <div class="nav__links nav__links--mobile" :class="{ open: isMenuOpen }">
      <a class="nav__link__menu" @click.prevent="handleClick">
        <svg
          v-if="!isMenuOpen"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="menu-open"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg
          v-else
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
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </a>
      <Logo />
      <div class="nav__link__icons">
        <g-link class="nav__link nav__link--icon" to="/cart" title="Cart">
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
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span v-if="cartCount >= 1" class="nav__link__cart__count">
            {{ cartCount }}
          </span>
        </g-link>
      </div>
      <div class="nav__links__inner" :class="{ visible: isMenuOpen }">
        <g-link class="nav__link" to="/" title="Home">Home</g-link>
        <g-link class="nav__link" to="/products" title="Products">
          Products
        </g-link>
        <g-link class="nav__link" to="/about" title="About">About</g-link>
        <g-link class="nav__link" to="/news" title="News">News</g-link>
        <g-link class="nav__link" to="/contact" title="Contact">Contact</g-link>
      </div>
    </div>
  </nav>
</template>

<script>
import Logo from '~/components/elements/Logo';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  components: { Logo },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.clear();
  },
  computed: {
    cart() {
      return this.$store.getters.cart;
    },
    cartCount() {
      return this.$store.getters.cartCount;
    },
  },
  methods: {
    init() {
      if (document.documentElement.classList.contains('overflow')) {
        document.documentElement.classList.remove('overflow');
      }
    },
    clear() {},
    handleClick() {
      this.isMenuOpen = !this.isMenuOpen;
      if (
        this.isMenuOpen &&
        !document.documentElement.classList.contains('overflow')
      ) {
        document.documentElement.classList.add('overflow');
      } else {
        document.documentElement.classList.remove('overflow');
      }
    },
  },
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  .nav__links {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &--desktop {
      width: 100%;

      .nav__links__inner {
        display: flex;
        align-items: center;
      }
    }

    &--mobile {
      display: none;
      width: 100%;

      .nav__link__icons {
        display: flex;

        .nav__link {
          &--icon {
            margin: 0;
          }
        }
      }

      .nav__link__menu {
        z-index: 1092;
        position: relative;
      }

      &.open {
        .nav__link__menu {
          svg {
            fill: #ffffff;
            stroke: #ffffff;
          }
        }
      }

      .nav__links__inner {
        &.visible {
          display: flex;
          position: fixed;
          background: #000;
          width: 100vw;
          height: 100vh;
          top: 0;
          z-index: 1072;
          left: 0;
          color: #fff;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .nav__link {
            margin-left: 0;
            margin-bottom: 12px;
            color: #ffffff;
          }
        }
      }
    }

    .nav__link {
      margin-left: 24px;
      position: relative;
      &--icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 8px;
        background-color: #ffffff;
        border-radius: 50%;

        > svg {
          width: 18px;
          height: 18px;
        }
      }

      &:last-child {
        margin-left: 12px;
      }

      .nav__link__cart__count {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 12px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        color: #ffffff;
        border-radius: 50%;
        width: 16px;
        height: 16px;
      }
    }

    .nav__link__menu {
      display: flex;
    }

    .nav__link__icons {
      display: flex;
    }
  }
}
</style>
