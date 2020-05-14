require("dotenv").config();

const path = require("path");

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/style/_variables.scss")],
    });
}

module.exports = {
  siteName: "smartwatch",
  plugins: [],
  templates: {
    Post: "/posts/:slug",
    Product: "/products/:slug",
  },
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
};
