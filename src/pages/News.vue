<template>
  <Layout>
    <h1 class="page__title">News</h1>
    <div class="posts container">
      <div class="posts__grid row">
        <div
          v-for="edge in $page.posts.edges"
          :key="edge.node.id"
          class="post col-4"
        >
          <g-link :to="`/posts/${edge.node.slug}`">
            <div class="post__preview">
              <g-image
                v-if="edge.node.image"
                :alt="edge.node.title"
                :src="edge.node.image"
              />
            </div>
            <div class="post__caption">
              <span class="post__name">{{ edge.node.title }}</span>
            </div>
          </g-link>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  posts: allPost(filter: { status: { eq: "publish" } }) {
    edges {
      node {
        id
        title
        content
        slug
        date
        type
        image
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'News',
  },
};
</script>

<style lang="scss">
.posts {
  padding: 0;

  .posts__grid {
    margin-left: -12px;
    margin-right: -12px;

    .post {
      padding: 12px;

      > a {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        background-color: #ffffff;
        padding: 20px;
        overflow: hidden;
      }

      .post__preview {
        height: 280px;
        width: 100%;
        overflow: hidden;
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          object-fit: contain;
          width: 100%;
          height: 100%;
          margin: auto;
          display: block;
        }
      }
      .post__caption {
        margin-top: 32px;

        .post__brand {
          color: $subtitle;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
