<template>
  <Layout>
    <div class="post">
      <div class="post__header">
        <div class="post__title">
          <h1 class="post__title__text">
            {{ $page.post.title }}
          </h1>
        </div>
        <g-image
          v-if="$page.post.image"
          :alt="$page.post.title"
          :src="$page.post.image"
          class="post__cover"
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
        image
    }
}
</page-query>

<style lang="scss">
.post {
  .post__header {
    margin-bottom: 24px;
  }
}
</style>
