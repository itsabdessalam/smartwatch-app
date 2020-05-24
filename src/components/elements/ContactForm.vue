<template>
  <div>
    <div class="form contact__form">
      <form class="form__inner" method="post" @submit.prevent="submit">
        <input type="hidden" name="form-name" value="contact" />
        <div class="form__body">
          <Alert v-if="sendError" type="error" :message="sendError" />
          <div class="field" :class="{ 'field--error': hasError('email') }">
            <label for="">Email</label>
            <input
              class="input"
              required
              autocomplete="disabled"
              v-model="fields.email"
              type="email"
              placeholder="user@email.com"
              @keydown="resetError('email')"
            />
            <p v-if="hasError('email')" class="help error">
              {{ hasError('email') }}
            </p>
          </div>
          <div
            class="field textarea"
            :class="{ 'field--error': hasError('message') }"
          >
            <label for="">Message</label>
            <textarea
              class="message"
              required
              v-model="fields.message"
              type="text"
              autocomplete="disabled"
              placeholder="Your message..."
              @keydown="resetError('message')"
            />
            <p v-if="hasError('message')" class="help error">
              {{ hasError('message') }}
            </p>
          </div>
        </div>
        <footer class="form__footer">
          <div class="inner__footer">
            <button
              type="submit"
              class="button button--primary submit"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Send</span>
              <Loader v-else :color="'#ffffff'"></Loader>
            </button>
          </div>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import ContactService from '../../../services/ContactService';

import { isValidEmail, isValidPassword } from '../../../utils/validator';
import { size } from '../../../utils/common';

import Button from '~/components/elements/Button';
import Form from '~/components/elements/Form';
import Loader from '~/components/elements/Loader';
import Alert from '~/components/elements/Alert';

export default {
  name: 'ContactForm',
  data() {
    return {
      isLoading: false,
      errors: {},
      sendError: '',
      fields: {
        email: '',
        message: '',
      },
    };
  },
  components: {
    Loader,
    Alert,
  },
  methods: {
    checkEmail(email) {
      if (!isValidEmail(email)) {
        this.errors.email = 'Email is required and must be valid!';
      }
    },
    checkMessage(message) {
      if (!message.length) {
        this.errors.message = 'Message is required!';
      }
    },
    checkForm(data) {
      this.errors = {};
      this.checkEmail(data.email);
      this.checkMessage(data.message);
      return size(this.errors) === 0;
    },
    handleError(error) {
      this.sendError =
        (error.response && error.response.data.error) || error.message;
    },
    hasError(field) {
      return this.errors[field];
    },
    resetError(field) {
      this.errors[field] = '';
      this.sendError = '';
    },
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`,
        )
        .join('&');
    },
    async submit() {
      const data = this.fields;
      const isValidForm = this.checkForm(data);

      if (isValidForm) {
        this.isLoading = true;

        try {
          await ContactService.submit(
            this.encode({
              'form-name': 'contact',
              ...data,
            }),
          );
          this.isLoading = false;
          this.$router.push('/contact-submit-success');
        } catch (error) {
          this.isLoading = false;
          this.handleError(error);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.contact__form {
  .form__inner {
    .field {
      margin-bottom: 24px;
    }
  }
  .form__footer {
    justify-content: flex-end;

    .inner__footer {
      width: 100%;

      > a {
        display: block;
        margin-bottom: 12px;
      }

      .submit {
        margin-left: auto;
      }
    }
  }
}
</style>
