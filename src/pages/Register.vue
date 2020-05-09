<template>
  <Layout>
    <h1>Register</h1>
    <button @click="register">Click here!</button>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Register",
  },
  data() {
    return {
      errors: {},
      authStatus: "",
      authStatusMessage: "",
      fields: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    register() {
      const data = {
        name: "toto",
        email: "test@test.com",
        password: "12345678",
      };
      this.$store
        .dispatch("register", data)
        .then(() => {
          this.$router.push("/account");
        })
        .catch((error) => {
          this.authStatus = this.$store.getters.authStatus;
          this.authStatusMessage = error.message;
        });
    },
  },
};
</script>
