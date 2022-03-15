const { IgnorePlugin } = require("webpack");
const webpack = require("@nativescript/webpack");

module.exports = (env) => {
  webpack.init(env);

  webpack.useConfig(false);

  webpack.chainWebpack((config) => {
    config.entry("index").add("./src/index.ts");
    config.mode("development");
    config.devtool("source-map");
    config.output.set("clean", true);
    config.output.library("typeorm").libraryTarget("umd").globalObject("this");

    config.plugin("IgnorePlugin").use(IgnorePlugin, [
      {
        checkResource(resource) {
          const ignores = [/capacitor/, /cordova/, /expo/, /react-native/];

          const shouldIgnore = ignores.some((ignoreRe) => {
            return resource.match(ignoreRe);
          });

          if (shouldIgnore) {
            return true;
          }
        },
      },
    ]);
  });

  // tsc --declaration --emitDeclarationOnly

  return webpack.resolveConfig();
};
