<template>
  <form
    name="contact"
    method="post"
    v-on:submit.prevent="handleSubmit"
    action="/contact-submit-success/"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="contact" />
    <p hidden>
      <label> Don’t fill this out: <input name="bot-field" /> </label>
    </p>
    <div class="sender-info">
      <div>
        <label for="name" class="label">Your name</label>
        <input type="text" name="name" v-model="form.name" />
      </div>
      <div>
        <label for="email">Your email</label>
        <input type="email" name="email" v-model="form.email" />
      </div>
    </div>

    <div class="message-wrapper">
      <label for="message">Message</label>
      <textarea name="message" v-model="form.message"></textarea>
    </div>
    <button type="submit">Submit form</button>
  </form>
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
      form: {
        email: '',
        message: '',
      },
    };
  },
  components: {
    // Loader,
    // Alert,
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
    handleSubmit(event) {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.encode({
          'form-name': event.target.getAttribute('name'),
          ...this.formData,
        }),
      })
        .then(() => this.$router.push('/contact-submit-success/'))
        .catch(error => alert(error));
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
