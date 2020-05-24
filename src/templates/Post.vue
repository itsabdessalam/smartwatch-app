<template>
  <Layout>
    <div class="post">
      <div class="post__header">
        <div class="post__title">
          <h1 class="post__title__text">
            {{ post.title }}
          </h1>
        </div>
        <g-image
          v-if="post.image"
          :alt="post.title"
          :src="post.image"
          class="post__cover"
        />
      </div>
      <div class="post__content" v-html="post.content" />
      <div class="post__footer"></div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: this.post.title,
      meta: [
        {
          name: 'description',
          content: this.post.description,
        },
      ],
    };
  },
  data() {
    return {
      post: {},
    };
  },
  created() {
    if (this.$page) {
      this.post = this.$page.post;
    }
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
