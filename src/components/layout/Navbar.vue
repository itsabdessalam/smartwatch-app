<template>
  <nav class="nav">
    <Logo />
    <div class="nav__links">
      <g-link class="nav__link" to="/" title="Home">Home</g-link>
      <g-link class="nav__link" to="/products" title="Products">
        Products
      </g-link>
      <g-link class="nav__link" to="/about" title="About">About</g-link>
      <g-link class="nav__link" to="/news" title="News">News</g-link>
      <g-link class="nav__link" to="/contact" title="Contact">Contact</g-link>
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
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
      </g-link>
    </div>
  </nav>
</template>
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

    .nav__link {
      margin-left: 20px;
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
    }
  }
}
</style>
<script>
import Logo from "~/components/elements/Logo";

export default {
  components: { Logo },
};
</script>
