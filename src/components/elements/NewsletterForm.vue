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
          <Form class="newsletter__form form--inline">
            <template #body>
              <div class="field" :class="{ 'field--error': hasError('email') }">
                <label for="email">Email</label>
                <input
                  class="input"
                  type="email"
                  name="email"
                  autocomplete="email"
                  placeholder="Your email address"
                  required
                  v-model="fields.email"
                  @keydown="resetError('email')"
                />
                <p
                  v-if="hasError('email') || subscribeError"
                  class="help error"
                >
                  {{ hasError('email') || subscribeError }}
                </p>
              </div>
            </template>
            <template #footer>
              <div>
                <Button
                  type="submit"
                  class="button--primary submit"
                  :disabled="isLoading"
                  @click.prevent="subscribe"
                >
                  <span v-if="!isLoading">Subscribe</span>
                  <Loader v-else :color="'#ffffff'" />
                </Button>
              </div>
            </template>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewsletterService from '../../../services/NewsletterService';
import { isValidEmail } from '../../../utils/validator';
import { size } from '../../../utils/common';

import Button from '~/components/elements/Button';
import Form from '~/components/elements/Form';
import Loader from '~/components/elements/Loader';

export default {
  name: 'NewsletterForm',
  data() {
    return {
      isLoading: false,
      errors: {},
      subscribeError: '',
      fields: {
        email: '',
      },
    };
  },
  components: {
    Button,
    Form,
    Loader,
  },
  methods: {
    checkEmail(email) {
      if (!isValidEmail(email)) {
        this.errors.email = 'Email is required and must be valid!';
      }
    },
    checkForm(data) {
      this.errors = {};
      this.checkEmail(data.email);
      return size(this.errors) === 0;
    },
    hasError(field) {
      return this.errors[field];
    },
    resetError(field) {
      this.errors[field] = '';
      this.subscribeError = '';
    },
    handleError(error) {
      this.subscribeError =
        (error.response && error.response.data.error) || error.message;
    },
    subscribe() {
      const isValidForm = this.checkForm(this.fields);

      if (isValidForm) {
        this.isLoading = true;

        NewsletterService.subscribe(this.fields)
          .then(() => {
            this.isLoading = false;
            this.$router.push('/newsletter-success');
          })
          .catch(error => {
            this.isLoading = false;
            this.handleError(error);
          });
      }
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
    justify-content: flex-end;
    flex-direction: column;

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
        padding: 16px;
        font-size: 14px;
      }
    }

    p.help {
      &.error {
        color: $error;
      }
    }

    .form--inline {
      .form__inner {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .field {
          p.help {
            margin: 0;
            font-size: 12px;
            bottom: unset;
            top: -18px;
          }
        }
      }

      .form__body {
        width: 100%;
      }
      .form__footer {
        margin: 0;
      }
    }
  }
}
</style>
