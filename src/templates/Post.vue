<template>
  <Layout>
    <div class="post-title">
      <h1 class="post-title__text">
        {{ $page.post.title }}
      </h1>
    </div>

    <div class="post content-box">
      <div class="post__header">
        <g-image
          alt="Cover image"
          v-if="$page.post.customFields.image"
          :src="$page.post.customFields.image"
        />
      </div>

      <div class="post__content" v-html="$page.post.content" />

      <div class="post__footer"></div>
    </div>

    <div class="post-comments"></div>
  </Layout>
</template>

<script>
export default {
  components: {},
  metaInfo() {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: "description",
          content: this.$page.post.description,
        },
      ],
    };
  },
};
</script>

<page-query>
query Post ($id: ID!) {
    post: post (id: $id) {
        id
        title
        content
        slug
        date
        type
        customFields {
            image
        }
    }
}
</page-query>

<style></style>
