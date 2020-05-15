require("dotenv").config();
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  siteName: "smartwatch",
  plugins: [
    {
      use: "gridsome-plugin-purgecss",
      options: {
        content: [
          "./src/**/*.vue",
          "./src/**/*.js",
          "./src/**/*.jsx",
          "./src/**/*.pug",
          "./src/**/*.md",
        ],
        defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
      },
    },
  ],
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
  },
};
