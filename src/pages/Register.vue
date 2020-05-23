<template>
  <Layout>
    <ClientOnly>
      <div class="register">
        <h1>Register</h1>
        <RegisterForm />
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import RegisterForm from '~/components/elements/RegisterForm';

export default {
  metaInfo: {
    title: 'Login',
  },
  components: {
    RegisterForm,
  },
};
</script>

<style lang="scss">
.register {
  h1 {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
