<template>
  <div>
    <Form class="register__form">
      <template #body>
        <Alert
          v-if="authStatus === 'error'"
          type="error"
          :message="authStatusMessage"
        />
        <div class="field" :class="{ 'field--error': hasError('name') }">
          <label for="">Name</label>
          <input
            class="input"
            required
            autocomplete="disabled"
            v-model="fields.name"
            type="text"
            placeholder="John Doe"
            @keydown="resetError('name')"
          />
          <p v-if="hasError('email')" class="help error">
            {{ hasError('name') }}
          </p>
        </div>
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
        <div class="field" :class="{ 'field--error': hasError('password') }">
          <label for="">Password</label>
          <input
            class="input"
            required
            v-model="fields.password"
            type="password"
            autocomplete="disabled"
            placeholder="••••••••••••"
            @keydown="resetError('password')"
          />
          <p v-if="hasError('password')" class="help error">
            {{ hasError('password') }}
          </p>
        </div>
      </template>
      <template #footer>
        <div class="inner__footer">
          <g-link to="/login">
            Already have an account?
          </g-link>
          <Button
            class="button--primary submit"
            :disabled="isLoading"
            @click.prevent="register"
          >
            <span v-if="!isLoading">Register</span>
            <Loader v-else :color="'#ffffff'"></Loader>
          </Button>
        </div>
      </template>
    </Form>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { isValidEmail, isValidPassword } from '../../../utils/validator';
import { size } from '../../../utils/common';

import Button from '~/components/elements/Button';
import Form from '~/components/elements/Form';
import Loader from '~/components/elements/Loader';
import Alert from '~/components/elements/Alert';

export default {
  name: 'RegsiterForm',
  data() {
    return {
      errors: {},
      authStatus: '',
      authStatusMessage: '',
      fields: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.authStatus === 'loading';
    },
  },
  components: {
    Button,
    Form,
    Loader,
    Alert,
  },
  methods: {
    checkName(name) {
      if (!name.length) {
        this.errors.name = 'Name is required!';
      }
    },
    checkEmail(email) {
      if (!isValidEmail(email)) {
        this.errors.email = 'Email is required and must be valid!';
      }
    },
    checkPassword(password) {
      if (!isValidPassword(password)) {
        this.errors.password =
          'Password is required and must be at least 8 characters long!';
      }
    },
    checkForm(data) {
      this.errors = {};
      this.checkName(data.name);
      this.checkEmail(data.email);
      this.checkPassword(data.password);
      return size(this.errors) === 0;
    },
    handleError(error) {
      this.authStatus = this.$store.getters.authStatus;
      this.authStatusMessage =
        (error.response && error.response.data.error) || error.message;
    },
    hasError(field) {
      return this.errors[field];
    },
    resetError(field) {
      this.errors[field] = '';
      this.authStatus = '';
    },
    async register() {
      const data = this.fields;
      const isValidForm = this.checkForm(data);

      if (isValidForm) {
        try {
          await this.$store.dispatch('register', data);
          this.$router.push('/account');
        } catch (error) {
          this.handleError(error);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.register__form {
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
