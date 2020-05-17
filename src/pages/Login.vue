<template>
  <Layout>
    <ClientOnly>
      <h1>Login</h1>
      <button @click="login">Click here!</button>
    </ClientOnly>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Login',
  },
  data() {
    return {
      errors: {},
      authStatus: '',
      authStatusMessage: '',
      fields: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const data = {
        email: 'test@test.com',
        password: '12345678',
      };

      this.$store
        .dispatch('login', data)
        .then(() => {
          this.$router.push('/account');
        })
        .catch(error => {
          this.authStatus = this.$store.getters.authStatus;
          this.authStatusMessage = error.message;
        });
    },
  },
};
</script>
