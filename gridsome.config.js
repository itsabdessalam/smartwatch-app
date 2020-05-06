require("dotenv").config();

module.exports = {
  siteName: "Gridsome",
  plugins: [],
  templates: {
    Post: "/posts/:slug",
    Product: "/products/:slug",
  },
};
