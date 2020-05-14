<template>
  <div class="newsletter">
    <div class="container">
      <div class="newsletter__content row">
        <div class="newsletter__content__item--right col-5">
          <h2>
            Newsletter
          </h2>
          <p>
            Subscribe to get special offers and free giveaways
          </p>
        </div>
        <div class="newsletter__content__item--left col-7">
          <form class="newsletter__form" method="POST" novalidate="true">
            <div class="field">
              <label>Email</label>
              <input
                class="input"
                :class="{ 'has-error': hasError('email') }"
                type="email"
                name="email"
                autocomplete="email"
                placeholder="Your email address"
                required
                v-model="fields.email"
                @keydown="resetError('email')"
              />
              <p v-if="hasError('email')" class="help error">
                {{ hasError("email") }}
              </p>
            </div>
            <button
              type="submit"
              class="button-primary submit"
              @click.prevent="subscribe"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {},
      fields: {
        email: "",
      },
    };
  },
  methods: {
    checkEmail(email) {
      if (!email.length) {
        this.errors.email = "Email is required and must be valid!";
      }
    },
    checkForm(data) {
      this.errors = {};
      this.checkEmail(data.email);
      return Object.keys(this.errors).length === 0;
    },
    hasError(field) {
      return this.errors[field];
    },
    resetError(field) {
      this.errors[field] = "";
    },
    subscribe() {
      const isValidForm = this.checkForm(this.fields);
    },
  },
};
</script>

<style lang="scss">
.newsletter {
  margin-top: 48px;
  background-color: #ffffff;
  padding: 40px 20px;

  h2 {
    margin-top: 0;
    margin-bottom: 8px;
  }

  .newsletter__content {
  }

  .newsletter__content__item--right {
  }

  .newsletter__content__item--left {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .newsletter__form {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;

      label {
        position: absolute !important;
        height: 1px;
        width: 1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
      }
      input {
        width: 100%;
        padding: 12px 16px;
        font-size: 14px;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all ease-out 0.2s;
        background-color: transparent;
        font-size: 14px;
        min-width: 100px;
        padding: 12px 24px;
        border: none;
        cursor: pointer;
        transition: all ease-out 0.2s;
        color: #ffffff;
        background-color: var(--primary);
        border: 1px solid var(--primary);
      }
    }
  }
}
</style>
