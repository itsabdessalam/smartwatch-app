require("dotenv").config();

const purgecss = require("@fullhuman/postcss-purgecss");
const postcssCombineMediaQuery = require("postcss-combine-media-query");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const postcssPlugins = [];

if (process.env.NODE_ENV === "production") {
  postcssPlugins.push();
}

module.exports = {
  siteName: "smartwatch",
  templates: {
    Post: "/posts/:slug",
    Product: "/products/:slug",
  },
  configureWebpack: {
    plugins: [
      new OptimizeCssAssetsPlugin({
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
              discardUnused: true,
              mergeIdents: true,
            },
          ],
        },
        canPrint: true,
      }),
    ],
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "${require("path").resolve(
          __dirname,
          "./src/assets/style/_variables.scss"
        )}";`,
      },
    },
    postcss: {
      plugins: [
        postcssCombineMediaQuery(),
        process.env.NODE_ENV === "production"
          ? purgecss(require("./purgecss.config.js"))
          : "",
      ],
    },
  },
};
