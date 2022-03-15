const { resolve } = require("path");
/**
 * @param {typeof import("@nativescript/webpack")} webpack
 */
module.exports = (webpack) => {
  webpack.chainWebpack((config) => {
    // alias typeorm to our bundled version
    config.resolve.alias.set("typeorm", resolve(__dirname, "./dist/index"));
  });
};
