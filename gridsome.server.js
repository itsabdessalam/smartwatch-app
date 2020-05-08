const WPService = require("./services/WPService");
const StripeService = require("./services/StripeService");
const { normalizeFields } = require("./utils");

const getPosts = async (actions) => {
  const { data } = await WPService.getPosts();

  const collection = actions.addCollection("Post");
  for (const post of data) {
    collection.addNode(normalizeFields(post));
  }
};

const getProducts = async (actions) => {
  const { data } = await WPService.getProducts();
  const collection = actions.addCollection("Product");
  for (const product of data) {
    collection.addNode(normalizeFields(product));
  }
};

module.exports = (api) => {
  api.loadSource(async (actions) => {
    await getPosts(actions);
    await getProducts(actions);
  });

  api.createPages(({ createPage }) => {});
};
