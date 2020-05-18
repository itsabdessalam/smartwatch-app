<template>
  <Layout>
    <ClientOnly>
      <div class="login">
        <h1>Login</h1>
        <LoginForm />
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import LoginForm from '~/components/elements/LoginForm';

export default {
  metaInfo: {
    title: 'Login',
  },
  components: {
    LoginForm,
  },
};
</script>

<style lang="scss">
.login {
  h1 {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
