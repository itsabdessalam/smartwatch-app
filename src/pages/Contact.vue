<template>
  <Layout>
    <ClientOnly>
      <div class="login">
        <h1>Contact</h1>
        <ContactForm />
      </div>
    </ClientOnly>
  </Layout>
</template>

<script>
import ContactForm from '~/components/elements/ContactForm';

export default {
  metaInfo: {
    title: 'Contact',
    meta: [
      {
        name: 'description',
        content: 'smatwatch website',
      },
    ],
  },
  components: {
    ContactForm,
  },
};
</script>
