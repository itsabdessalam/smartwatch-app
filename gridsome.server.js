const WPService = require('./services/WPService');
const { normalizeFields } = require('./utils/normalizer');

const getPosts = async actions => {
  const { data } = await WPService.getPosts();

  const collection = actions.addCollection('Post');
  for (const post of data) {
    collection.addNode(normalizeFields(post));
  }
};

const getProducts = async actions => {
  const { data } = await WPService.getProducts();
  const productsCollection = actions.addCollection('Product');
  const normalizedData = [];

  for (const product of data) {
    normalizedData.push(normalizeFields(product));
    productsCollection.addNode(normalizeFields(product));
  }

  const brandsCollection = actions.addCollection('Brand');
  const brands = [
    ...new Set(normalizedData.map(item => item.brand && item.brand.name)),
  ];

  for (let index = 0; index < brands.length; index++) {
    brandsCollection.addNode({ name: brands[index] });
  }
};

module.exports = api => {
  api.loadSource(async actions => {
    await getPosts(actions);
    await getProducts(actions);
  });

  api.createPages(() => {});
};
