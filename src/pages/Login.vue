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
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  components: {
    LoginForm,
  },
};
</script>
