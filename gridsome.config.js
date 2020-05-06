require("dotenv").config();

module.exports = {
  siteName: "smartwatch",
  plugins: [],
  templates: {
    Post: "/posts/:slug",
    Product: "/products/:slug",
  },
};
