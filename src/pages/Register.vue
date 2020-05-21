<template>
  <Layout>
    <ClientOnly>
      <h1>Register</h1>
      <button @click="register">Click here!</button>
    </ClientOnly>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'Register',
  },
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
  methods: {
    register() {},
  },
};
</script>
