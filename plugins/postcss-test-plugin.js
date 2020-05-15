var postcss = require("postcss");
module.exports = postcss.plugin("postcss-test-plugin", function() {
  return function(root) {
    console.log("root", root);
  };
});
