const path = require("path");

module.exports = {
  configureWebpack: {
    runtimeCompiler: true,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
};
