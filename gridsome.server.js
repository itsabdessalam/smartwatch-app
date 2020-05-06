const WPService = require("./src/services/WPService");

const normalizeWordPressPost = (item) => {
  return {
    id: item.ID || item.id,
    title: item.post_title,
    slug: item.post_name,
    date: item.post_date,
    content: item.post_content,
    type: item.post_type,
    customFields: item.custom_fields,
  };
};

const getPosts = async (actions) => {
  const { data } = await WPService.getPosts();

  const collection = actions.addCollection("Post");
  for (const item of data) {
    collection.addNode(normalizeWordPressPost(item));
  }
};

const getProducts = async (actions) => {
  const { data } = await WPService.getProducts();
  const collection = actions.addCollection("Product");
  for (const item of data) {
    collection.addNode(normalizeWordPressPost(item));
  }
};

module.exports = (api) => {
  api.loadSource(async (actions) => {
    await getPosts(actions);
    await getProducts(actions);
  });

  api.createPages(({ createPage }) => {});
};
